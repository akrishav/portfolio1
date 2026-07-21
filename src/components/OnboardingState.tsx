"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UploadedFile {
  name: string;
  uploadedAt: string;
  size: string;
  status: "pending_review" | "approved" | "rejected";
}

export interface OnboardingStep {
  number: number;
  name: string;
  description: string;
  status: "completed" | "in_progress" | "stuck" | "pending";
  actionRequiredText?: string;
  actionType?: "upload" | "sign" | "external_link" | "none";
  actionLink?: string;
  uploadedFiles: UploadedFile[];
  isWaived?: boolean;
  waiverReason?: string;
  slaExtendedHours?: number;
  startedAt?: string;
}

export interface ERPDocument {
  name: string;
  fileName: string;
  submissionStatus: "Completed" | "Pending";
  approvalStatus: "Submitted" | "Waiting" | "Approved";
}

export interface ERPPlacementItem {
  name: string;
  status: "Pending" | "Completed";
}

export interface Message {
  id: string;
  candidateId: string;
  sender: "candidate" | "recruiter" | "system";
  senderName: string;
  text: string;
  timestamp: string;
}

export interface NotificationLog {
  id: string;
  candidateId: string;
  recipient: "candidate" | "recruiter" | "hierarchy";
  recipientName: string;
  channel: "email" | "sms" | "system";
  subject: string;
  message: string;
  timestamp: string;
  status: "delivered" | "pending" | "synced";
  sender?: string;
  isExternalSync?: boolean;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  recruiterName: string;
  recruiterEmail: string;
  candidateNo: string;
  clientName: string;
  mspName: string;
  stateCode: string;
  startDate: string;
  scheduledStartDate: string;
  scheduledEndDate: string;
  obOwner: string;
  obClassification: string;
  employmentType: string;
  initiatedBy: string;
  stepStatus: "completed" | "in_progress" | "stuck" | "pending" | "terminated";
  currentStep: number;
  stuckReason?: string;
  stuckExplanation?: string;
  onboardingSteps: OnboardingStep[];
  // ERP Specific properties
  erpDocuments: ERPDocument[];
  erpPlacementItems: ERPPlacementItem[];
  backgroundStatus: "Completed" | "Pending";
  drugCheckStatus: "Completed" | "Pending";
  daysStuck?: number;
  hasNoApplication?: boolean;
  slaStatus?: "active" | "breached";
  slaBreachDetails?: string;
  anomalyAlert?: string;
}

export interface SlaStepConfig {
  stepNumber: number;
  stepName: string;
  durationValue: number;
  durationUnit: "hours" | "days";
  owner: "candidate" | "recruiter" | "onboarder" | "vendor";
  reminderLeadTime: number;
  reminderLeadUnit: "hours" | "days";
  escalationTarget: string[];
}

export interface SlaAuditLog {
  id: string;
  candidateId: string;
  stepNumber: number;
  eventType: "start" | "at_risk" | "breach" | "escalation" | "waiver";
  description: string;
  timestamp: string;
  operator: string;
  previousState?: string;
  newState?: string;
}

export interface FieldComparison {
  fieldName: string;
  goldenValue: string;
  extractedValue: string;
  isMatch: boolean;
}

export interface AnomalyRecord {
  id: string;
  candidateId: string;
  type: "identity_mismatch" | "document_tampering" | "bgc_anomaly" | "step_skip";
  title: string;
  description: string;
  severity: "hard-block" | "soft-flag" | "warning";
  status: "open" | "resolved" | "closed";
  stepNumber: number;
  readStatus: "readable" | "unreadable" | "uncertain";
  fieldComparisons?: FieldComparison[];
  waiverReason?: string;
  timestamp: string;
}

export interface AnomalyAuditLog {
  id: string;
  candidateId: string;
  action: string;
  details: string;
  timestamp: string;
  operator: string;
  previousState?: string;
  newState?: string;
}

interface OnboardingContextType {
  candidates: Candidate[];
  messages: Message[];
  notifications: NotificationLog[];
  loggedInUser: { email: string; role: "candidate" | "recruiter" | "none" } | null;
  selectedCandidateId: string | null;
  slaSettings: SlaStepConfig[];
  simulationOffsetDays: number;
  slaAuditLogs: SlaAuditLog[];
  activeRole: "recruiter" | "audit";
  anomalies: AnomalyRecord[];
  anomalyAuditLogs: AnomalyAuditLog[];
  login: (email: string, role: "candidate" | "recruiter") => boolean;
  logout: () => void;
  setSelectedCandidateId: (id: string | null) => void;
  sendCandidateMessage: (candidateId: string, text: string, sender: "candidate" | "recruiter") => void;
  uploadDocument: (candidateId: string, stepNumber: number, fileName: string, fileSize: string) => void;
  updateCandidateStepStatus: (candidateId: string, stepNumber: number, status: "completed" | "in_progress" | "stuck" | "pending") => void;
  resolveStep: (candidateId: string, stepNumber: number) => void;
  resolveERPDocument: (candidateId: string, docName: string) => void;
  resolveERPPlacement: (candidateId: string, placementName: string) => void;
  triggerReminder: (candidateId: string, stepNumber: number, recipientType: "candidate" | "recruiter" | "hierarchy", channel: "email" | "sms") => void;
  updateSlaConfig: (config: SlaStepConfig[]) => void;
  advanceSimulationTime: (days: number) => void;
  applySlaWaiver: (candidateId: string, stepNumber: number, reason: string, operator: string) => void;
  toggleActiveRole: () => void;
  updateAnomalyStatus: (id: string, nextStatus: AnomalyRecord["status"], reason?: string) => void;
  triggerMockAnomaly: (candidateId: string, type: AnomalyRecord["type"]) => void;
  transferToClient: (candidateId: string) => { success: boolean; error?: string };
  resetDemoState: () => void;
}

const defaultSteps = (): OnboardingStep[] => [
  { number: 1, name: "Personal Details", description: "Submit personal contact information", status: "completed", uploadedFiles: [], startedAt: "2026-07-04 09:00 AM" },
  { number: 2, name: "Addresses", description: "Submit address history details", status: "completed", uploadedFiles: [], startedAt: "2026-07-05 10:00 AM" },
  { number: 3, name: "Equal Employment", description: "Equal Employment Opportunity disclosures", status: "completed", uploadedFiles: [], startedAt: "2026-07-06 09:00 AM" },
  { number: 4, name: "Emergency Contact", description: "Provide primary emergency contact", status: "completed", uploadedFiles: [], startedAt: "2026-07-06 11:00 AM" },
  { number: 5, name: "Onboarding", description: "Standard client onboarding form", status: "completed", uploadedFiles: [], startedAt: "2026-07-07 09:00 AM" },
  { number: 6, name: "Benefits", description: "Select medical & retirement benefits", status: "completed", uploadedFiles: [], startedAt: "2026-07-08 09:00 AM" },
  { number: 7, name: "I-9 Eligibility", description: "Employment eligibility check (Form I-9)", status: "completed", uploadedFiles: [], startedAt: "2026-07-08 11:00 AM" },
  { number: 8, name: "Acknowledgments", description: "Acknowledge employee handbooks", status: "completed", uploadedFiles: [], startedAt: "2026-07-09 09:00 AM" },
  {
    number: 9,
    name: "W-4 Withholding",
    description: "Complete IRS Form W-4",
    status: "stuck",
    actionRequiredText: "Complete W-4 Withholding forms to proceed.",
    actionType: "upload",
    uploadedFiles: [],
    startedAt: "2026-07-09 10:00 AM"
  },
  { number: 10, name: "State Withholding", description: "Complete state tax withholding form", status: "pending", uploadedFiles: [], startedAt: "2026-07-09 11:00 AM" },
  { number: 11, name: "Method of Payment", description: "Select direct deposit or check payment", status: "pending", uploadedFiles: [], startedAt: "2026-07-09 01:00 PM" },
  { number: 12, name: "Education Details — Optional", description: "Education history details", status: "pending", uploadedFiles: [], startedAt: "2026-07-09 02:00 PM" },
  { number: 13, name: "Previous Employers — Optional", description: "List prior employment history", status: "pending", uploadedFiles: [], startedAt: "2026-07-09 04:00 PM" },
  { number: 14, name: "Required Uploads", description: "Upload required licensing and certification files", status: "pending", uploadedFiles: [], startedAt: "2026-07-09 05:00 PM" }
];

const debraSteps = (): OnboardingStep[] => [
  { number: 1, name: "Personal Details", description: "Submit personal contact information", status: "completed", uploadedFiles: [], startedAt: "2026-07-04 09:00 AM" },
  { number: 2, name: "Addresses", description: "Submit address history details", status: "completed", uploadedFiles: [], startedAt: "2026-07-05 10:00 AM" },
  { number: 3, name: "Equal Employment", description: "Equal Employment Opportunity disclosures", status: "completed", uploadedFiles: [], startedAt: "2026-07-06 09:00 AM" },
  { number: 4, name: "Emergency Contact", description: "Provide primary emergency contact", status: "completed", uploadedFiles: [], startedAt: "2026-07-06 11:00 AM" },
  { number: 5, name: "Onboarding", description: "Standard client onboarding form", status: "completed", uploadedFiles: [], startedAt: "2026-07-07 09:00 AM" },
  { number: 6, name: "Benefits", description: "Select medical & retirement benefits", status: "pending", uploadedFiles: [], startedAt: "2026-07-08 09:00 AM" },
  { number: 7, name: "I-9 Eligibility", description: "Employment eligibility check (Form I-9)", status: "completed", uploadedFiles: [], startedAt: "2026-07-08 11:00 AM" },
  { number: 8, name: "Acknowledgments", description: "Acknowledge employee handbooks", status: "pending", uploadedFiles: [], startedAt: "2026-07-09 09:00 AM" },
  { number: 9, name: "W-4 Withholding", description: "Complete IRS Form W-4", status: "completed", uploadedFiles: [], startedAt: "2026-07-09 10:00 AM" },
  {
    number: 10,
    name: "State Withholding",
    description: "Complete state tax withholding form",
    status: "stuck",
    actionRequiredText: "Please complete state tax withholding details to proceed.",
    actionType: "upload",
    uploadedFiles: [],
    startedAt: "2026-07-09 11:00 AM"
  },
  { number: 11, name: "Method of Payment", description: "Select direct deposit or check payment", status: "pending", uploadedFiles: [], startedAt: "2026-07-09 01:00 PM" },
  { number: 12, name: "Education Details — Optional", description: "Education history details", status: "completed", uploadedFiles: [], startedAt: "2026-07-09 02:00 PM" },
  { number: 13, name: "Previous Employers — Optional", description: "List prior employment history", status: "completed", uploadedFiles: [], startedAt: "2026-07-09 04:00 PM" },
  { number: 14, name: "Required Uploads", description: "Upload required licensing and certification files", status: "pending", uploadedFiles: [], startedAt: "2026-07-09 05:00 PM" }
];

const initialCandidates = (): Candidate[] => [
  {
    id: "candidate-mani",
    name: "Mani",
    email: "mani@staffhc.com",
    phone: "(555) 234-5678",
    jobTitle: "ICU Registered Nurse",
    recruiterName: "Alex",
    recruiterEmail: "alex@staffhc.com",
    candidateNo: "67288",
    clientName: "CDK Global",
    mspName: "Ascension Health (Hallmark)",
    stateCode: "Texas",
    startDate: "Jul 09, 2026",
    scheduledStartDate: "Jul 09, 2026",
    scheduledEndDate: "Nov 27, 2026",
    obOwner: "Alex",
    obClassification: "Clinical - Patient Facing",
    employmentType: "W2 - Hourly",
    initiatedBy: "Bindhu R",
    slaStatus: "active",
    currentStep: 9,
    stepStatus: "stuck",
    stuckReason: "Complete Form W-4 Withholding",
    stuckExplanation: "Complete W-4 Withholding forms to proceed.",
    onboardingSteps: defaultSteps(),
    erpDocuments: [
      { name: "Professional Nursing License", fileName: "-", submissionStatus: "Pending", approvalStatus: "Waiting" },
      { name: "Immunization Records", fileName: "-", submissionStatus: "Pending", approvalStatus: "Waiting" },
      { name: "Background Check Consent", fileName: "Background_Consent_Signed.pdf", submissionStatus: "Completed", approvalStatus: "Submitted" }
    ],
    erpPlacementItems: [
      { name: "Purchase Order", status: "Pending" },
      { name: "E-Verification", status: "Pending" },
      { name: "Orientation", status: "Pending" }
    ],
    backgroundStatus: "Completed",
    drugCheckStatus: "Pending"
  },
  {
    id: "candidate-debra",
    name: "Debra Bailey",
    email: "debra@example.com",
    phone: "(555) 902-8812",
    jobTitle: "Senior Staff Accountant",
    recruiterName: "Arun Chikkaverappa",
    recruiterEmail: "arun.c@staffhc.com",
    candidateNo: "67295",
    clientName: "CDK Global",
    mspName: "Ascension Health (Hallmark)",
    stateCode: "Minnesota",
    startDate: "Jul 09, 2026",
    scheduledStartDate: "Jul 09, 2026",
    scheduledEndDate: "Nov 27, 2026",
    obOwner: "Arun Chikkaverappa",
    obClassification: "Computers",
    employmentType: "W2 - Hourly",
    initiatedBy: "Bindhu R (Jul 08, 2026 07:13)",
    slaStatus: "breached",
    slaBreachDetails: "Drug screening voucher expired — background check checkmark blocked for 5 days.",
    currentStep: 10,
    stepStatus: "stuck",
    stuckReason: "Complete State Withholding",
    stuckExplanation: "Please complete state tax withholding details to proceed.",
    onboardingSteps: debraSteps(),
    erpDocuments: [
      { name: "401K Benefit", fileName: "401K_Benefit.pdf", submissionStatus: "Completed", approvalStatus: "Submitted" },
      { name: "Annual Evaluation", fileName: "-", submissionStatus: "Pending", approvalStatus: "Waiting" },
      { name: "Background Check", fileName: "-", submissionStatus: "Pending", approvalStatus: "Waiting" },
      { name: "Drug Check", fileName: "-", submissionStatus: "Pending", approvalStatus: "Waiting" },
      { name: "Employee Agreement", fileName: "-", submissionStatus: "Pending", approvalStatus: "Waiting" },
      { name: "Employee Offer Letter - Hourly(Weekly)", fileName: "-", submissionStatus: "Pending", approvalStatus: "Waiting" },
      { name: "Handbook Ack Last Page", fileName: "-", submissionStatus: "Pending", approvalStatus: "Waiting" },
      { name: "I9", fileName: "-", submissionStatus: "Pending", approvalStatus: "Waiting" },
      { name: "Passports", fileName: "-", submissionStatus: "Pending", approvalStatus: "Waiting" },
      { name: "Payroll Acknowledgement", fileName: "-", submissionStatus: "Pending", approvalStatus: "Waiting" },
      { name: "State W4", fileName: "StateW4_MN.pdf", submissionStatus: "Completed", approvalStatus: "Submitted" },
      { name: "W4", fileName: "-", submissionStatus: "Pending", approvalStatus: "Waiting" }
    ],
    erpPlacementItems: [
      { name: "Purchase Order", status: "Pending" },
      { name: "E-Verification", status: "Pending" },
      { name: "Orientation", status: "Pending" }
    ],
    backgroundStatus: "Completed",
    drugCheckStatus: "Pending"
  },
  {
    id: "candidate-tiffany",
    name: "Tiffany Vance",
    email: "tiffany@example.com",
    phone: "(555) 382-9901",
    jobTitle: "ICU Registered Nurse",
    recruiterName: "Mani",
    recruiterEmail: "mani@staffhc.com",
    candidateNo: "67296",
    clientName: "CDK Global",
    mspName: "Ascension Health (Hallmark)",
    stateCode: "Georgia",
    startDate: "Jul 09, 2026",
    scheduledStartDate: "Jul 09, 2026",
    scheduledEndDate: "Nov 27, 2026",
    obOwner: "Mani",
    obClassification: "Clinical - Patient Facing",
    employmentType: "W2 - Hourly",
    initiatedBy: "Bindhu R",
    slaStatus: "active",
    anomalyAlert: "Signatures mismatch: FCRA form name differs from profile name 'Tiffany Vance'.",
    currentStep: 9,
    stepStatus: "stuck",
    stuckReason: "Complete Form W-4 Withholding",
    stuckExplanation: "Complete W-4 Withholding forms to proceed.",
    onboardingSteps: defaultSteps(),
    erpDocuments: [
      { name: "Background Check Consent", fileName: "-", submissionStatus: "Pending", approvalStatus: "Waiting" }
    ],
    erpPlacementItems: [
      { name: "Purchase Order", status: "Pending" },
      { name: "E-Verification", status: "Pending" }
    ],
    backgroundStatus: "Pending",
    drugCheckStatus: "Pending"
  },
  {
    id: "candidate-irene",
    name: "Irene Bailey",
    email: "irene@example.com",
    phone: "(555) 123-9988",
    jobTitle: "Clinical Assistant",
    recruiterName: "CPX Admin",
    recruiterEmail: "cpx.admin@staffhc.com",
    candidateNo: "67298",
    clientName: "CDK Global",
    mspName: "Ascension Health (Hallmark)",
    stateCode: "Minnesota",
    startDate: "Jul 09, 2026",
    scheduledStartDate: "Jul 09, 2026",
    scheduledEndDate: "Nov 27, 2026",
    obOwner: "CPX Admin",
    obClassification: "Clinical - Patient Facing",
    employmentType: "W2 - Hourly",
    initiatedBy: "Bindhu R (Jul 08, 2026 08:17)",
    currentStep: 13,
    stepStatus: "completed",
    onboardingSteps: defaultSteps().map(s => ({ ...s, status: "completed" as const })),
    erpDocuments: [],
    erpPlacementItems: [],
    backgroundStatus: "Completed",
    drugCheckStatus: "Completed"
  },
  {
    id: "candidate-lesley",
    name: "Lesley Olsen",
    email: "lesley@example.com",
    phone: "(555) 728-1932",
    jobTitle: "Software Developer",
    recruiterName: "Arun Chikkaverappa",
    recruiterEmail: "arun.c@staffhc.com",
    candidateNo: "67291",
    clientName: "CDK Global",
    mspName: "Ascension Health (Hallmark)",
    stateCode: "Illinois",
    startDate: "Jul 08, 2026",
    scheduledStartDate: "Jul 08, 2026",
    scheduledEndDate: "Nov 27, 2026",
    obOwner: "Arun Chikkaverappa",
    obClassification: "Computers",
    employmentType: "W2 - Hourly",
    initiatedBy: "Bindhu R",
    currentStep: 13,
    stepStatus: "completed",
    onboardingSteps: defaultSteps().map(s => ({ ...s, status: "completed" as const })),
    erpDocuments: [],
    erpPlacementItems: [],
    backgroundStatus: "Completed",
    drugCheckStatus: "Completed"
  },
  {
    id: "candidate-susana",
    name: "Susana Olsen",
    email: "susana@example.com",
    phone: "(555) 923-8822",
    jobTitle: "HR Administrator",
    recruiterName: "CPX Admin",
    recruiterEmail: "cpx.admin@staffhc.com",
    candidateNo: "67290",
    clientName: "CDK Global",
    mspName: "Ascension Health (Hallmark)",
    stateCode: "Illinois",
    startDate: "Jul 08, 2026",
    scheduledStartDate: "Jul 08, 2026",
    scheduledEndDate: "Nov 27, 2026",
    obOwner: "CPX Admin",
    obClassification: "Administrative",
    employmentType: "W2 - Hourly",
    initiatedBy: "Bindhu R",
    currentStep: 13,
    stepStatus: "completed",
    onboardingSteps: defaultSteps().map(s => ({ ...s, status: "completed" as const })),
    erpDocuments: [],
    erpPlacementItems: [],
    backgroundStatus: "Completed",
    drugCheckStatus: "Completed"
  },
  {
    id: "candidate-dominic",
    name: "Dominic Olsen",
    email: "dominic@example.com",
    phone: "(555) 832-1111",
    jobTitle: "System Analyst",
    recruiterName: "CPX Admin",
    recruiterEmail: "cpx.admin@staffhc.com",
    candidateNo: "67289",
    clientName: "CDK Global",
    mspName: "Ascension Health (Hallmark)",
    stateCode: "Idaho",
    startDate: "Jul 07, 2026",
    scheduledStartDate: "Jul 07, 2026",
    scheduledEndDate: "Nov 27, 2026",
    obOwner: "CPX Admin",
    obClassification: "Computers",
    employmentType: "W2 - Hourly",
    initiatedBy: "Bindhu R",
    currentStep: 9,
    stepStatus: "in_progress",
    onboardingSteps: defaultSteps().map((s, idx) => ({
      ...s,
      status: idx < 8 ? "completed" as const : idx === 8 ? "in_progress" : "pending"
    })),
    erpDocuments: [],
    erpPlacementItems: [],
    backgroundStatus: "Completed",
    drugCheckStatus: "Pending"
  },
  {
    id: "candidate-marvin",
    name: "Marvin Olsen",
    email: "marvin@example.com",
    phone: "(555) 234-9281",
    jobTitle: "Network Engineer",
    recruiterName: "Arun Chikkaverappa",
    recruiterEmail: "arun.c@staffhc.com",
    candidateNo: "67281",
    clientName: "CDK Global",
    mspName: "Ascension Health (Hallmark)",
    stateCode: "Rhode Island",
    startDate: "Jul 06, 2026",
    scheduledStartDate: "Jul 06, 2026",
    scheduledEndDate: "Nov 27, 2026",
    obOwner: "Arun Chikkaverappa",
    obClassification: "Computers",
    employmentType: "W2 - Hourly",
    initiatedBy: "Bindhu R",
    currentStep: 9,
    stepStatus: "terminated",
    onboardingSteps: defaultSteps(),
    erpDocuments: [],
    erpPlacementItems: [],
    backgroundStatus: "Pending",
    drugCheckStatus: "Pending"
  }
];

const initialMessages = (): Message[] => [
  {
    id: "msg-1",
    candidateId: "candidate-mani",
    sender: "recruiter",
    senderName: "Alex",
    text: "Hi Mani! I've reviewed your screening. You just need to upload that license file and we can move to interviews.",
    timestamp: "10:45 AM",
  },
  {
    id: "msg-2",
    candidateId: "candidate-mani",
    sender: "candidate",
    senderName: "Mani",
    text: "Thanks Alex! Doing it now.",
    timestamp: "10:48 AM",
  }
];

const initialNotifications = (): NotificationLog[] => [
  {
    id: "notif-1",
    candidateId: "candidate-mani",
    recipient: "candidate",
    recipientName: "Mani",
    channel: "email",
    subject: "Action Required: Complete Onboarding Step 3",
    message: "Hi Mani, your credentials package is missing your Nursing License file. Please log in to your dashboard to upload it.",
    timestamp: "2026-07-09 10:45 AM",
    status: "delivered",
  },
  {
    id: "notif-2",
    candidateId: "candidate-debra",
    recipient: "candidate",
    recipientName: "Debra Bailey",
    channel: "email",
    subject: "Action Required: Onboarding Documents Upload",
    message: "Dear Debra, please complete your pending orientation modules and upload your W-4 forms in your candidate portal.",
    timestamp: "2026-07-09 09:12 AM",
    status: "delivered"
  },
  {
    id: "notif-3",
    candidateId: "candidate-mani",
    recipient: "recruiter",
    recipientName: "Alex",
    channel: "email",
    subject: "RE: Professional Nursing License submission question",
    sender: "Mani <mani@staffhc.com>",
    message: "Incoming synced message from candidate's personal Gmail (mani@staffhc.com):\n\n\"I am having trouble uploading the state registration PDF, is a scanned copy fine?\"",
    timestamp: "2026-07-09 11:15 AM",
    status: "synced",
    isExternalSync: true
  },
  {
    id: "notif-4",
    candidateId: "candidate-mani",
    recipient: "recruiter",
    recipientName: "Alex",
    channel: "email",
    subject: "RE: Welcome to StaffHC Portal - Action Required",
    sender: "Mani <mani@staffhc.com>",
    message: "Incoming synced message from Mani's Outlook client:\n\n\"Confirming my profile account setup is complete. Thanks!\"",
    timestamp: "2026-07-06 02:40 PM",
    status: "synced",
    isExternalSync: true
  }
];

const DEFAULT_SLA_CONFIGS: SlaStepConfig[] = [
  { stepNumber: 1, stepName: "Personal Details", durationValue: 1, durationUnit: "days", owner: "candidate", reminderLeadTime: 12, reminderLeadUnit: "hours", escalationTarget: ["Recruiter"] },
  { stepNumber: 2, stepName: "Addresses", durationValue: 2, durationUnit: "days", owner: "candidate", reminderLeadTime: 1, reminderLeadUnit: "days", escalationTarget: ["Recruiter"] },
  { stepNumber: 3, stepName: "Equal Employment", durationValue: 2, durationUnit: "days", owner: "candidate", reminderLeadTime: 1, reminderLeadUnit: "days", escalationTarget: ["Recruiter"] },
  { stepNumber: 4, stepName: "Emergency Contact", durationValue: 1, durationUnit: "days", owner: "candidate", reminderLeadTime: 12, reminderLeadUnit: "hours", escalationTarget: ["Recruiter"] },
  { stepNumber: 5, stepName: "Onboarding", durationValue: 1, durationUnit: "days", owner: "candidate", reminderLeadTime: 12, reminderLeadUnit: "hours", escalationTarget: ["Recruiter"] },
  { stepNumber: 6, stepName: "Benefits", durationValue: 3, durationUnit: "days", owner: "candidate", reminderLeadTime: 1, reminderLeadUnit: "days", escalationTarget: ["Team Lead"] },
  { stepNumber: 7, stepName: "I-9 Eligibility", durationValue: 3, durationUnit: "days", owner: "candidate", reminderLeadTime: 1, reminderLeadUnit: "days", escalationTarget: ["OB Manager"] },
  { stepNumber: 8, stepName: "Acknowledgments", durationValue: 2, durationUnit: "days", owner: "candidate", reminderLeadTime: 12, reminderLeadUnit: "hours", escalationTarget: ["Team Lead"] },
  { stepNumber: 9, stepName: "W-4 Withholding", durationValue: 3, durationUnit: "days", owner: "candidate", reminderLeadTime: 1, reminderLeadUnit: "days", escalationTarget: ["OB Manager"] },
  { stepNumber: 10, stepName: "State Withholding", durationValue: 2, durationUnit: "days", owner: "candidate", reminderLeadTime: 1, reminderLeadUnit: "days", escalationTarget: ["Team Lead"] },
  { stepNumber: 11, stepName: "Method of Payment", durationValue: 2, durationUnit: "days", owner: "candidate", reminderLeadTime: 1, reminderLeadUnit: "days", escalationTarget: ["Team Lead"] },
  { stepNumber: 12, stepName: "Education Details — Optional", durationValue: 5, durationUnit: "days", owner: "candidate", reminderLeadTime: 2, reminderLeadUnit: "days", escalationTarget: ["Recruiter"] },
  { stepNumber: 13, stepName: "Previous Employers — Optional", durationValue: 5, durationUnit: "days", owner: "candidate", reminderLeadTime: 2, reminderLeadUnit: "days", escalationTarget: ["Recruiter"] },
  { stepNumber: 14, stepName: "Required Uploads", durationValue: 3, durationUnit: "days", owner: "candidate", reminderLeadTime: 1, reminderLeadUnit: "days", escalationTarget: ["Recruiter"] }
];

const DEFAULT_ANOMALIES: AnomalyRecord[] = [
  {
    id: "anomaly-1",
    candidateId: "candidate-mani",
    type: "identity_mismatch",
    title: "Document SSN/Name Identity Mismatch",
    description: "Extracted SSN and Name from uploaded Professional License file do not match Candidate Profile's golden record.",
    severity: "hard-block",
    status: "open",
    stepNumber: 3,
    readStatus: "readable",
    fieldComparisons: [
      { fieldName: "Full Name", goldenValue: "Mani", extractedValue: "Mani Ganesan", isMatch: false },
      { fieldName: "Date of Birth", goldenValue: "1992-04-12", extractedValue: "1992-04-12", isMatch: true },
      { fieldName: "SSN (Tax ID)", goldenValue: "XXX-XX-1234", extractedValue: "XXX-XX-9876", isMatch: false },
      { fieldName: "License Number", goldenValue: "TX-998822", extractedValue: "TX-998822", isMatch: true }
    ],
    timestamp: "2026-07-10 10:30 AM"
  },
  {
    id: "anomaly-2",
    candidateId: "candidate-debra",
    type: "document_tampering",
    title: "W-4 Form Layout Hash Tampering Flag",
    description: "SHA-256 layout hash signature of uploaded file differs from the security hash template of the W-4 Form. Uploaded version might be modified.",
    severity: "hard-block",
    status: "open",
    stepNumber: 3,
    readStatus: "unreadable",
    fieldComparisons: [
      { fieldName: "Document Integrity Hash", goldenValue: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", extractedValue: "8f4a62c9cc72b8349bbef80a552278f99e41b785ca88cc59bbefc8088eeff43a", isMatch: false }
    ],
    timestamp: "2026-07-09 02:15 PM"
  },
  {
    id: "anomaly-3",
    candidateId: "candidate-debra",
    type: "bgc_anomaly",
    title: "BGC Adverse Hit Record Match",
    description: "Simulated Sterling Background Check report flagged a potential adverse history match (misdemeanor hit or credit flags) requiring compliance audit.",
    severity: "soft-flag",
    status: "open",
    stepNumber: 2,
    readStatus: "readable",
    timestamp: "2026-07-08 11:00 AM"
  },
  {
    id: "anomaly-4",
    candidateId: "candidate-ganesan",
    type: "step_skip",
    title: "Step Completed Without Uploaded Artifact",
    description: "Step 2 (Screening) was marked as completed in ERP ledger, but no background check consent form or clinical license upload was detected.",
    severity: "warning",
    status: "open",
    stepNumber: 2,
    readStatus: "uncertain",
    timestamp: "2026-07-07 04:00 PM"
  }
];

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [notifications, setNotifications] = useState<NotificationLog[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<OnboardingContextType["loggedInUser"]>(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [slaSettings, setSlaSettings] = useState<SlaStepConfig[]>([]);
  const [simulationOffsetDays, setSimulationOffsetDays] = useState<number>(0);
  const [slaAuditLogs, setSlaAuditLogs] = useState<SlaAuditLog[]>([]);
  const [activeRole, setActiveRole] = useState<"recruiter" | "audit">("recruiter");
  const [anomalies, setAnomalies] = useState<AnomalyRecord[]>([]);
  const [anomalyAuditLogs, setAnomalyAuditLogs] = useState<AnomalyAuditLog[]>([]);

  useEffect(() => {
    const savedCandidates = localStorage.getItem("staffhc_candidates_v5");
    const savedMessages = localStorage.getItem("staffhc_messages_v5");
    const savedNotifs = localStorage.getItem("staffhc_notifications_v5");
    const savedUser = localStorage.getItem("staffhc_logged_user_v5");

    if (savedCandidates) {
      try {
        let parsed = JSON.parse(savedCandidates);
        if (Array.isArray(parsed)) {
          parsed = parsed.map(c => {
            if (c.onboardingSteps && c.onboardingSteps.length === 13) {
              c.onboardingSteps.push({
                number: 14,
                name: "Required Uploads",
                description: "Upload required licensing and certification files",
                status: "pending",
                uploadedFiles: [],
                startedAt: "2026-07-09 05:00 PM"
              });
            }
            if (c.id === "candidate-mani") {
              return {
                ...c,
                name: "Mani",
                email: "mani@staffhc.com",
                hasNoApplication: false
              };
            }
            return c;
          });
        }
        setCandidates(parsed);
      } catch (err) {
        setCandidates(initialCandidates());
      }
    } else {
      setCandidates(initialCandidates());
    }

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages(initialMessages());
    }

    if (savedNotifs) {
      setNotifications(JSON.parse(savedNotifs));
    } else {
      setNotifications(initialNotifications());
    }

    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setLoggedInUser(parsed);
      if (parsed.role === "candidate") {
        const cleanEmail = parsed.email.toLowerCase().trim();
        const emailToFind = cleanEmail === "candidate@healthcare.com" ? "mani@staffhc.com" : cleanEmail;
        const candidatesList = savedCandidates ? JSON.parse(savedCandidates) : initialCandidates();
        const match = candidatesList.find((c: any) => c.email.toLowerCase() === emailToFind);
        if (match) {
          setSelectedCandidateId(match.id);
        }
      }
    }

    const savedSlaConfig = localStorage.getItem("staffhc_sla_config_v2");
    const savedSlaAudit = localStorage.getItem("staffhc_sla_audit_v2");
    const savedSimOffset = localStorage.getItem("staffhc_sim_offset");

    if (savedSlaConfig) {
      try {
        const parsed = JSON.parse(savedSlaConfig);
        const mapped = parsed.map((item: any) => {
          let targets: string[] = [];
          if (Array.isArray(item.escalationTarget)) {
            targets = item.escalationTarget.map((t: string) => t === "OB Owner (OB Rep)" ? "OB Owner" : t);
          } else if (typeof item.escalationTarget === "string" && item.escalationTarget) {
            const lower = item.escalationTarget.toLowerCase();
            if (lower === "recruiter") targets = ["Recruiter"];
            else if (lower === "team lead") targets = ["Team Lead"];
            else if (lower === "manager" || lower === "ob manager") targets = ["OB Manager"];
            else if (lower === "delivery manager") targets = ["Delivery Manager"];
            else if (lower === "ob owner" || lower === "ob owner (ob rep)") targets = ["OB Owner"];
            else targets = [item.escalationTarget];
          } else {
            targets = ["Recruiter"];
          }
          return {
            ...item,
            escalationTarget: targets
          };
        });
        setSlaSettings(mapped);
      } catch (e) {
        setSlaSettings(DEFAULT_SLA_CONFIGS);
      }
    } else {
      setSlaSettings(DEFAULT_SLA_CONFIGS);
    }

    if (savedSlaAudit) {
      setSlaAuditLogs(JSON.parse(savedSlaAudit));
    } else {
      setSlaAuditLogs([]);
    }

    if (savedSimOffset) {
      setSimulationOffsetDays(Number(savedSimOffset));
    } else {
      setSimulationOffsetDays(0);
    }

    const savedAnomalies = localStorage.getItem("staffhc_anomalies_v3");
    const savedAnomalyAudit = localStorage.getItem("staffhc_anomaly_audit_v2");
    const savedActiveRole = localStorage.getItem("staffhc_active_role_v2");

    if (savedAnomalies) {
      try {
        const parsed = JSON.parse(savedAnomalies);
        if (Array.isArray(parsed)) {
          const upgraded = parsed.map((a: any) => {
            if (a.status === "waived" || a.status === "false_positive" || a.status === "in_review") {
              return { ...a, status: "closed" as const };
            }
            return a;
          });
          setAnomalies(upgraded);
        } else {
          setAnomalies(DEFAULT_ANOMALIES);
        }
      } catch (err) {
        setAnomalies(DEFAULT_ANOMALIES);
      }
    } else {
      setAnomalies(DEFAULT_ANOMALIES);
    }

    if (savedAnomalyAudit) {
      setAnomalyAuditLogs(JSON.parse(savedAnomalyAudit));
    } else {
      setAnomalyAuditLogs([]);
    }

    if (savedActiveRole === "audit" || savedActiveRole === "recruiter") {
      setActiveRole(savedActiveRole);
    } else {
      setActiveRole("recruiter");
    }
  }, []);

  useEffect(() => {
    if (candidates.length > 0) {
      localStorage.setItem("staffhc_candidates_v5", JSON.stringify(candidates));
    }
  }, [candidates]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("staffhc_messages_v5", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem("staffhc_notifications_v5", JSON.stringify(notifications));
    }
  }, [notifications]);

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("staffhc_logged_user_v5", JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem("staffhc_logged_user_v5");
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (slaSettings.length > 0) {
      localStorage.setItem("staffhc_sla_config_v2", JSON.stringify(slaSettings));
    }
  }, [slaSettings]);

  useEffect(() => {
    if (slaAuditLogs.length > 0) {
      localStorage.setItem("staffhc_sla_audit_v2", JSON.stringify(slaAuditLogs));
    }
  }, [slaAuditLogs]);

  useEffect(() => {
    localStorage.setItem("staffhc_sim_offset", String(simulationOffsetDays));
  }, [simulationOffsetDays]);

  useEffect(() => {
    if (anomalies.length > 0) {
      localStorage.setItem("staffhc_anomalies_v3", JSON.stringify(anomalies));
    }
  }, [anomalies]);

  useEffect(() => {
    if (anomalyAuditLogs.length > 0) {
      localStorage.setItem("staffhc_anomaly_audit_v2", JSON.stringify(anomalyAuditLogs));
    }
  }, [anomalyAuditLogs]);

  useEffect(() => {
    localStorage.setItem("staffhc_active_role_v2", activeRole);
  }, [activeRole]);

  const login = (email: string, role: "candidate" | "recruiter") => {
    const cleanEmail = email.toLowerCase().trim();
    if (role === "candidate") {
      const emailToFind = cleanEmail === "candidate@healthcare.com" ? "mani@staffhc.com" : cleanEmail;
      
      // Force sync candidate-mani details in candidate list to avoid cached local storage mismatches
      const maniMatch = candidates.find(c => c.id === "candidate-mani");
      if (maniMatch && (emailToFind === "mani@staffhc.com")) {
        maniMatch.email = "mani@staffhc.com";
        maniMatch.name = "Mani";
        maniMatch.hasNoApplication = false;
        setCandidates([...candidates]);
        setLoggedInUser({ email: cleanEmail, role: "candidate" });
        setSelectedCandidateId(maniMatch.id);
        return true;
      }

      const match = candidates.find(c => c.email.toLowerCase() === emailToFind);
      if (match) {
        setLoggedInUser({ email: cleanEmail, role: "candidate" });
        setSelectedCandidateId(match.id);
        return true;
      }
      const newCand: Candidate = {
        id: `candidate-${Date.now()}`,
        name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
        email: cleanEmail,
        phone: "(555) 019-2831",
        jobTitle: "Registered Nurse (RN)",
        recruiterName: "Mani",
        recruiterEmail: "mani@staffhc.com",
        candidateNo: Math.floor(10000 + Math.random() * 90000).toString(),
        clientName: "CDK Global",
        mspName: "Ascension Health (Hallmark)",
        stateCode: "Texas",
        startDate: "Jul 09, 2026",
        scheduledStartDate: "Jul 09, 2026",
        scheduledEndDate: "Nov 27, 2026",
        obOwner: "Mani",
        obClassification: "Clinical - Patient Facing",
        employmentType: "W2 - Hourly",
        initiatedBy: "Bindhu R",
        currentStep: 1,
        stepStatus: "pending",
        hasNoApplication: true,
        onboardingSteps: [],
        erpDocuments: [],
        erpPlacementItems: [],
        backgroundStatus: "Pending",
        drugCheckStatus: "Pending"
      };
      setCandidates(prev => [...prev, newCand]);
      setLoggedInUser({ email: cleanEmail, role: "candidate" });
      setSelectedCandidateId(newCand.id);
      return true;
    } else {
      if (cleanEmail.includes("recruiter") || cleanEmail.includes("staffhc.com") || cleanEmail === "mani@staffhc.com" || cleanEmail === "admin" || cleanEmail === "arun@example.com" || cleanEmail === "debra") {
        setLoggedInUser({ email: cleanEmail, role: "recruiter" });
        return true;
      }
      return false;
    }
  };

  const logout = () => {
    setLoggedInUser(null);
    setSelectedCandidateId(null);
  };

  const sendCandidateMessage = (candidateId: string, text: string, sender: "candidate" | "recruiter") => {
    const cand = candidates.find(c => c.id === candidateId);
    if (!cand) return;

    const senderName = sender === "candidate" ? cand.name : cand.recruiterName;
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      candidateId,
      sender,
      senderName,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);

    if (sender === "recruiter") {
      const newNotif: NotificationLog = {
        id: `notif-${Date.now()}`,
        candidateId,
        recipient: "candidate",
        recipientName: cand.name,
        channel: "sms",
        subject: "New Message from Mani",
        message: `${cand.recruiterName} sent you a message: "${text.substring(0, 40)}..."`,
        timestamp: new Date().toLocaleString(),
        status: "delivered"
      };
      setNotifications(prev => [...prev, newNotif]);
    }
  };

  const uploadDocument = (candidateId: string, stepNumber: number, fileName: string, fileSize: string) => {
    setCandidates(prev => prev.map(c => {
      if (c.id !== candidateId) return c;

      // Update 7-step onboarding roadmap
      const updatedSteps = c.onboardingSteps.map(step => {
        if (step.number !== stepNumber) return step;

        const newFile: UploadedFile = {
          name: fileName,
          uploadedAt: new Date().toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }),
          size: fileSize,
          status: "pending_review"
        };

        return {
          ...step,
          status: "in_progress" as const,
          actionRequiredText: "Awaiting review",
          uploadedFiles: [...step.uploadedFiles, newFile]
        };
      });

      // Update matching ERP document listing (if exists)
      const targetDoc = stepNumber === 3 ? "Professional Nursing License" : "Immunization Records";
      const updatedERPDocs = c.erpDocuments.map(doc => {
        if (doc.name.toLowerCase().includes(stepNumber === 3 ? "license" : "immunization")) {
          return {
            ...doc,
            fileName: fileName,
            submissionStatus: "Completed" as const,
            approvalStatus: "Submitted" as const
          };
        }
        return doc;
      });

      return {
        ...c,
        onboardingSteps: updatedSteps,
        erpDocuments: updatedERPDocs,
        stepStatus: "in_progress",
        stuckReason: undefined,
        stuckExplanation: undefined,
        daysStuck: undefined
      };
    }));

    // Trigger system message, email log, and recruiter alert
    const cand = candidates.find(c => c.id === candidateId);
    if (!cand) return;

    const newMsg: Message = {
      id: `msg-sys-${Date.now()}`,
      candidateId,
      sender: "system",
      senderName: "StaffHC Onboarding",
      text: `Document uploaded: "${fileName}" (Step ${stepNumber}). Review pending.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);

    const newNotif: NotificationLog = {
      id: `notif-${Date.now()}`,
      candidateId,
      recipient: "recruiter",
      recipientName: cand.recruiterName,
      channel: "email",
      subject: `Document Uploaded: ${cand.name} - Step ${stepNumber}`,
      message: `Candidate ${cand.name} has uploaded a new document (${fileName}) for Step ${stepNumber}. Please review and approve in ERP.`,
      timestamp: new Date().toLocaleString(),
      status: "delivered"
    };

    setNotifications(prev => [...prev, newNotif]);
  };

  const updateCandidateStepStatus = (candidateId: string, stepNumber: number, status: "completed" | "in_progress" | "stuck" | "pending") => {
    setCandidates(prev => {
      const next = prev.map(c => {
        if (c.id !== candidateId) return c;

        const updatedSteps = c.onboardingSteps.map(step => {
          if (step.number === stepNumber) {
            return {
              ...step,
              status,
              actionRequiredText: undefined
            };
          }
          if (status === "completed" && step.number === stepNumber + 1 && step.status === "pending") {
            return {
              ...step,
              status: "in_progress" as const
            };
          }
          return step;
        });

        const nextIncomplete = updatedSteps.find(s => s.status !== "completed");
        const nextStepNum = nextIncomplete ? nextIncomplete.number : 14;
        const nextStatus = nextIncomplete ? nextIncomplete.status : ("completed" as const);

        return {
          ...c,
          onboardingSteps: updatedSteps,
          currentStep: nextStepNum,
          stepStatus: nextStatus === "completed" ? "completed" : nextStatus === "stuck" ? "stuck" : "in_progress",
          stuckReason: nextStatus === "stuck" ? c.stuckReason : undefined,
          stuckExplanation: nextStatus === "stuck" ? c.stuckExplanation : undefined,
          daysStuck: nextStatus === "stuck" ? c.daysStuck : undefined
        };
      });
      localStorage.setItem("staffhc_candidates_v5", JSON.stringify(next));
      return next;
    });
  };

  const resolveStep = (candidateId: string, stepNumber: number) => {
    setCandidates(prev => prev.map(c => {
      if (c.id !== candidateId) return c;

      const currentStepObj = c.onboardingSteps.find(s => s.number === stepNumber);
      if (!currentStepObj) return c;

      const updatedSteps = c.onboardingSteps.map(step => {
        if (step.number === stepNumber) {
          const approvedFiles = step.uploadedFiles.map(f => ({ ...f, status: "approved" as const }));
          return {
            ...step,
            status: "completed" as const,
            uploadedFiles: approvedFiles,
            actionRequiredText: undefined
          };
        }

        if (step.number === stepNumber + 1) {
          return {
            ...step,
            status: "in_progress" as const,
            actionRequiredText: step.actionRequiredText || "Active step, in progress."
          };
        }

        return step;
      });

      const nextStep = stepNumber + 1;
      const isFinished = stepNumber === 7;

      return {
        ...c,
        onboardingSteps: updatedSteps,
        currentStep: isFinished ? 7 : nextStep,
        stepStatus: isFinished ? ("completed" as const) : ("in_progress" as const),
        stuckReason: undefined,
        stuckExplanation: undefined,
        daysStuck: undefined
      };
    }));

    const cand = candidates.find(c => c.id === candidateId);
    if (!cand) return;

    const newMsg: Message = {
      id: `msg-sys-${Date.now()}`,
      candidateId,
      sender: "system",
      senderName: "StaffHC Onboarding",
      text: `Step ${stepNumber}: Approved by compliance.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);

    const newNotif: NotificationLog = {
      id: `notif-${Date.now()}`,
      candidateId,
      recipient: "candidate",
      recipientName: cand.name,
      channel: "email",
      subject: "Onboarding Document Approved",
      message: `Hi ${cand.name}, your document for Step ${stepNumber} has been approved by the compliance team. You can now proceed to the next step.`,
      timestamp: new Date().toLocaleString(),
      status: "delivered"
    };

    setNotifications(prev => [...prev, newNotif]);
  };

  const resolveERPDocument = (candidateId: string, docName: string) => {
    setCandidates(prev => prev.map(c => {
      if (c.id !== candidateId) return c;

      const updatedDocs = c.erpDocuments.map(doc => {
        if (doc.name === docName) {
          return {
            ...doc,
            approvalStatus: "Approved" as const,
            submissionStatus: "Completed" as const
          };
        }
        return doc;
      });

      return {
        ...c,
        erpDocuments: updatedDocs
      };
    }));

    // Alert candidate via simulated email
    const cand = candidates.find(c => c.id === candidateId);
    if (!cand) return;

    const newNotif: NotificationLog = {
      id: `notif-${Date.now()}`,
      candidateId,
      recipient: "candidate",
      recipientName: cand.name,
      channel: "email",
      subject: `Approved: Onboarding Document - ${docName}`,
      message: `Dear ${cand.name}, the onboarding team has approved your document submission: ${docName}.`,
      timestamp: new Date().toLocaleString(),
      status: "delivered"
    };

    setNotifications(prev => [...prev, newNotif]);
  };

  const resolveERPPlacement = (candidateId: string, placementName: string) => {
    setCandidates(prev => prev.map(c => {
      if (c.id !== candidateId) return c;

      const updatedItems = c.erpPlacementItems.map(item => {
        if (item.name === placementName) {
          return { ...item, status: "Completed" as const };
        }
        return item;
      });

      return {
        ...c,
        erpPlacementItems: updatedItems
      };
    }));

    // Trigger system message
    const cand = candidates.find(c => c.id === candidateId);
    if (!cand) return;

    const newNotif: NotificationLog = {
      id: `notif-${Date.now()}`,
      candidateId,
      recipient: "candidate",
      recipientName: cand.name,
      channel: "email",
      subject: `Completed: Placement Task - ${placementName}`,
      message: `Dear ${cand.name}, your placement requirement "${placementName}" has been marked as Completed.`,
      timestamp: new Date().toLocaleString(),
      status: "delivered"
    };

    setNotifications(prev => [...prev, newNotif]);
  };

  const triggerReminder = (
    candidateId: string,
    stepNumber: number,
    recipientType: "candidate" | "recruiter" | "hierarchy",
    channel: "email" | "sms"
  ) => {
    const cand = candidates.find(c => c.id === candidateId);
    if (!cand) return;

    const stepName = cand.onboardingSteps[stepNumber - 1].name;
    let subject = "";
    let message = "";
    let recipientName = "";

    if (recipientType === "candidate") {
      recipientName = cand.name;
      subject = channel === "email" 
        ? `REMINDER: Complete Step ${stepNumber} of your StaffHC Onboarding` 
        : `StaffHC Onboarding Reminder`;
      message = channel === "email"
        ? `Hi ${cand.name},\n\nFriendly reminder to complete Step ${stepNumber}: ${stepName}.\n\nStuck Reason: ${cand.stuckReason || "Awaiting action"}.\n\nAccess portal: staffhc.com/onboarding\n\nBest,\nMani`
        : `Hi ${cand.name}, complete Step ${stepNumber} (${cand.stuckReason}) to progress: staffhc.com/onboarding`;
    } else if (recipientType === "recruiter") {
      recipientName = cand.recruiterName;
      subject = `ALERT: Onboarding Stalled - ${cand.name}`;
      message = `Recruiter Alert: ${cand.name} stuck on Step ${stepNumber} for ${cand.daysStuck || 3} days. Reason: "${cand.stuckReason}".`;
    } else {
      recipientName = "Operations Director";
      subject = `ESCALATION: Onboarding Bottleneck - ${cand.name}`;
      message = `Escalation Notice: Onboarding for ${cand.name} blocked on Step ${stepNumber} for ${cand.daysStuck || 5} days.\nRecruiter: ${cand.recruiterName}.\nReason: ${cand.stuckReason}.`;
    }

    const newNotif: NotificationLog = {
      id: `notif-${Date.now()}`,
      candidateId,
      recipient: recipientType,
      recipientName,
      channel,
      subject,
      message,
      timestamp: new Date().toLocaleString(),
      status: "delivered"
    };

    setNotifications(prev => [...prev, newNotif]);

    const newMsg: Message = {
      id: `msg-sys-${Date.now()}`,
      candidateId,
      sender: "system",
      senderName: "StaffHC Onboarding",
      text: `Reminder sent to ${recipientName} via ${channel.toUpperCase()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
  };

  const triggerSimulatedSlaEvents = (nextOffset: number) => {
    setNotifications(prevNotifs => {
      const updated = [...prevNotifs];
      if (nextOffset >= 1) {
        const exists = updated.some(n => n.id === `sim-at-risk-${nextOffset}`);
        if (!exists) {
          updated.push({
            id: `sim-at-risk-${nextOffset}`,
            candidateId: "candidate-mani",
            recipient: "candidate",
            recipientName: "Mani",
            channel: "email",
            subject: "Action Required: Complete Onboarding Step 3 immediately",
            message: `Hi Mani, your Credentialing step is approaching its final deadline. Please upload your Nursing License file now to complete.`,
            timestamp: `Today 09:12 AM`,
            status: "delivered"
          });

          // Add SLA audit log for warning margin
          setSlaAuditLogs(prevLogs => {
            const existsLog = prevLogs.some(l => l.id === `audit-at-risk-${nextOffset}`);
            if (existsLog) return prevLogs;
            return [...prevLogs, {
              id: `audit-at-risk-${nextOffset}`,
              candidateId: "candidate-mani",
              stepNumber: 9,
              eventType: "at_risk",
              description: "Step 9 (W-4 Withholding) reached 48-hour warning margin limit.",
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " " + new Date().toLocaleDateString(),
              operator: "System",
              previousState: "active",
              newState: "warning"
            }];
          });
        }
      }
      if (nextOffset >= 2) {
        const exists = updated.some(n => n.id === `sim-breach-${nextOffset}`);
        if (!exists) {
          updated.push({
            id: `sim-breach-${nextOffset}`,
            candidateId: "candidate-mani",
            recipient: "recruiter",
            recipientName: "Alex",
            channel: "system",
            subject: "SLA Breach Escalation: Step 3 Credentialing (Mani)",
            message: `⚠️ System escalated SLA breach for Mani (Step 3: Credentialing). Target exceeded. Notification routed to manager.`,
            timestamp: `Today 10:30 AM`,
            status: "delivered"
          });

          // Add SLA audit log for SLA breach
          setSlaAuditLogs(prevLogs => {
            const existsLog = prevLogs.some(l => l.id === `audit-breach-${nextOffset}`);
            if (existsLog) return prevLogs;
            return [...prevLogs, {
              id: `audit-breach-${nextOffset}`,
              candidateId: "candidate-mani",
              stepNumber: 9,
              eventType: "breach",
              description: "SLA breached: Step 9 (W-4 Withholding) exceeded duration limit.",
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " " + new Date().toLocaleDateString(),
              operator: "System",
              previousState: "warning",
              newState: "breached"
            }];
          });

          // Update candidate Mani SLA status to breached
          setCandidates(prevCands => {
            const nextC = prevCands.map(c => {
              if (c.id === "candidate-mani") {
                return {
                  ...c,
                  slaStatus: "breached" as const,
                  slaBreachDetails: "Step 9 (W-4 Withholding) exceeded 3-day SLA target."
                };
              }
              return c;
            });
            localStorage.setItem("staffhc_candidates_v5", JSON.stringify(nextC));
            return nextC;
          });
        }
      }
      return updated;
    });
  };

  const updateSlaConfig = (config: SlaStepConfig[]) => {
    setSlaSettings(config);
  };

  const advanceSimulationTime = (days: number) => {
    setSimulationOffsetDays(prev => {
      const nextOffset = prev + days;
      triggerSimulatedSlaEvents(nextOffset);
      return nextOffset;
    });
  };

  const applySlaWaiver = (candidateId: string, stepNumber: number, reason: string, operator: string) => {
    setCandidates(prevCandidates => {
      const next = prevCandidates.map(cand => {
        if (cand.id === candidateId) {
          const updatedSteps = cand.onboardingSteps.map(step => {
            if (step.number === stepNumber) {
              return {
                ...step,
                isWaived: true,
                waiverReason: reason,
                status: "completed" as const
              };
            }
            return step;
          });

          let nextStep = cand.currentStep;
          let nextStepStatus = cand.stepStatus;
          if (cand.currentStep === stepNumber) {
            const pendingStep = updatedSteps.find(s => s.status !== "completed");
            if (pendingStep) {
              nextStep = pendingStep.number;
              nextStepStatus = "in_progress";
              pendingStep.status = "in_progress";
              pendingStep.startedAt = new Date().toISOString().split('T')[0] + " 09:00 AM";
            } else {
              nextStepStatus = "completed";
            }
          }

          return {
            ...cand,
            currentStep: nextStep,
            stepStatus: nextStepStatus,
            slaStatus: "active" as const, // Clear breach status on waiver
            onboardingSteps: updatedSteps
          };
        }
        return cand;
      });
      localStorage.setItem("staffhc_candidates_v5", JSON.stringify(next));
      return next;
    });

    const cand = candidates.find(c => c.id === candidateId);
    const prevSlaStatus = cand ? cand.slaStatus : "active";

    const newLog: SlaAuditLog = {
      id: `audit-${Date.now()}`,
      candidateId,
      stepNumber,
      eventType: "waiver",
      description: `SLA waived for Step ${stepNumber}. Reason: "${reason}"`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " " + new Date().toLocaleDateString(),
      operator,
      previousState: prevSlaStatus,
      newState: "active"
    };
    setSlaAuditLogs(prev => [...prev, newLog]);
  };

  const toggleActiveRole = () => {
    setActiveRole(prev => prev === "recruiter" ? "audit" : "recruiter");
  };

  const updateAnomalyStatus = (id: string, nextStatus: AnomalyRecord["status"], reason?: string) => {
    setAnomalies(prev => {
      const updated = prev.map(anom => {
        if (anom.id === id) {
          return { ...anom, status: nextStatus, waiverReason: reason };
        }
        return anom;
      });
      localStorage.setItem("staffhc_anomalies_v3", JSON.stringify(updated));
      return updated;
    });

    const targetAnomaly = anomalies.find(a => a.id === id);
    if (targetAnomaly) {
      const actionText = nextStatus === "closed" ? "Anomaly Overridden (Closed)" : "Anomaly Resolved";
      const newLog: AnomalyAuditLog = {
        id: `anom-audit-${Date.now()}`,
        candidateId: targetAnomaly.candidateId,
        action: actionText,
        details: `Status changed to ${nextStatus}. Reason: "${reason || 'N/A'}"`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " " + new Date().toLocaleDateString(),
        operator: activeRole === "audit" ? "Alex (Compliance Audit)" : "Alex (Recruiter)",
        previousState: targetAnomaly.status,
        newState: nextStatus
      };
      setAnomalyAuditLogs(prev => [...prev, newLog]);
    }
  };

  const triggerMockAnomaly = (candidateId: string, type: AnomalyRecord["type"]) => {
    const id = `anomaly-${Date.now()}`;
    let title = "Document Mismatch";
    let description = "Extracted information does not match profile.";
    let severity: AnomalyRecord["severity"] = "hard-block";

    if (type === "identity_mismatch") {
      title = "Identity Name Mismatch Detected";
      description = "Golden record Name differs from Extracted Name on contract.";
    } else if (type === "document_tampering") {
      title = "SHA-256 Layout Checksum Mismatch";
      description = "Warning: document hash changed between upload and send state.";
    } else if (type === "bgc_anomaly") {
      title = "Background Check Adverse Entry Flagged";
      description = "Adverse entry found on Sterling report. Manual verification required.";
      severity = "soft-flag";
    } else if (type === "step_skip") {
      title = "Compliance Step Completed with No File Upload";
      description = "Step marked as done in client dashboard but uploaded files array is empty.";
      severity = "warning";
    }

    const newAnomaly: AnomalyRecord = {
      id,
      candidateId,
      type,
      title,
      description,
      severity,
      status: "open",
      stepNumber: 3,
      readStatus: type === "bgc_anomaly" ? "readable" : type === "step_skip" ? "uncertain" : "unreadable",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " " + new Date().toLocaleDateString()
    };

    setAnomalies(prev => [...prev, newAnomaly]);

    setNotifications(prev => {
      const next = [...prev];
      next.push({
        id: `notif-anom-${Date.now()}`,
        candidateId,
        recipient: "recruiter",
        recipientName: "Alex",
        channel: "system",
        subject: `CRITICAL: ${title}`,
        message: `⚠️ System Flagged Anomaly on candidate file: ${description}`,
        timestamp: "Just Now",
        status: "delivered"
      });
      return next;
    });
  };

  const transferToClient = (candidateId: string): { success: boolean; error?: string } => {
    const blockers = anomalies.filter(a => a.candidateId === candidateId && a.severity === "hard-block" && a.status === "open");
    if (blockers.length > 0) {
      return { 
        success: false, 
        error: `Transfer Blocked: ${blockers.length} open hard-block anomaly items require resolution/waiver before MSP export.`
      };
    }

    const newLog: AnomalyAuditLog = {
      id: `anom-audit-${Date.now()}`,
      candidateId,
      action: "Client Transfer Successful",
      details: "Candidate onboarding file successfully uploaded system-to-system to CDK Global MSP portal.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " " + new Date().toLocaleDateString(),
      operator: "Alex",
      previousState: "pending_export",
      newState: "exported"
    };
    setAnomalyAuditLogs(prev => [...prev, newLog]);

    return { success: true };
  };

  const resetDemoState = () => {
    localStorage.removeItem("staffhc_candidates_v5");
    localStorage.removeItem("staffhc_messages_v5");
    localStorage.removeItem("staffhc_notifications_v5");
    localStorage.removeItem("staffhc_logged_user_v5");
    localStorage.removeItem("staffhc_sla_config_v2");
    localStorage.removeItem("staffhc_sla_audit_v2");
    localStorage.removeItem("staffhc_sim_offset");
    localStorage.removeItem("staffhc_anomalies_v3");
    localStorage.removeItem("staffhc_anomaly_audit_v2");
    localStorage.removeItem("staffhc_active_role_v2");
    setCandidates(initialCandidates());
    setMessages(initialMessages());
    setNotifications(initialNotifications());
    setLoggedInUser(null);
    setSelectedCandidateId(null);
    setSlaSettings(DEFAULT_SLA_CONFIGS);
    setSlaAuditLogs([]);
    setSimulationOffsetDays(0);
    setAnomalies(DEFAULT_ANOMALIES);
    setAnomalyAuditLogs([]);
    setActiveRole("recruiter");
  };

  return (
    <OnboardingContext.Provider
      value={{
        candidates,
        messages,
        notifications,
        loggedInUser,
        selectedCandidateId,
        slaSettings,
        simulationOffsetDays,
        slaAuditLogs,
        activeRole,
        anomalies,
        anomalyAuditLogs,
        login,
        logout,
        setSelectedCandidateId,
        sendCandidateMessage,
        uploadDocument,
        updateCandidateStepStatus,
        resolveStep,
        resolveERPDocument,
        resolveERPPlacement,
        triggerReminder,
        updateSlaConfig,
        advanceSimulationTime,
        applySlaWaiver,
        toggleActiveRole,
        updateAnomalyStatus,
        triggerMockAnomaly,
        transferToClient,
        resetDemoState
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
