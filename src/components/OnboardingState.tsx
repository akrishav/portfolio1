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
  status: "delivered" | "pending";
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
  slaStatus?: "active" | "breached";
  slaBreachDetails?: string;
  anomalyAlert?: string;
}

interface OnboardingContextType {
  candidates: Candidate[];
  messages: Message[];
  notifications: NotificationLog[];
  loggedInUser: { email: string; role: "candidate" | "recruiter" | "none" } | null;
  selectedCandidateId: string | null;
  login: (email: string, role: "candidate" | "recruiter") => boolean;
  logout: () => void;
  setSelectedCandidateId: (id: string | null) => void;
  sendCandidateMessage: (candidateId: string, text: string, sender: "candidate" | "recruiter") => void;
  uploadDocument: (candidateId: string, stepNumber: number, fileName: string, fileSize: string) => void;
  resolveStep: (candidateId: string, stepNumber: number) => void;
  resolveERPDocument: (candidateId: string, docName: string) => void;
  resolveERPPlacement: (candidateId: string, placementName: string) => void;
  triggerReminder: (candidateId: string, stepNumber: number, recipientType: "candidate" | "recruiter" | "hierarchy", channel: "email" | "sms") => void;
  resetDemoState: () => void;
}

const defaultSteps = (): OnboardingStep[] => [
  { number: 1, name: "Application", description: "Submit application form", status: "completed", uploadedFiles: [] },
  { number: 2, name: "Screening", description: "Clinical background check", status: "completed", uploadedFiles: [] },
  {
    number: 3,
    name: "Credentialing",
    description: "Verify licenses and certifications",
    status: "stuck",
    actionRequiredText: "Missing or expired license file.",
    actionType: "upload",
    uploadedFiles: []
  },
  { number: 4, name: "Interview", description: "Clinical specialist interview", status: "pending", uploadedFiles: [] },
  { number: 5, name: "Contract", description: "Placement agreement contract", status: "pending", uploadedFiles: [] },
  { number: 6, name: "Compliance", description: "Facility compliance modules", status: "pending", uploadedFiles: [] },
  { number: 7, name: "Ready", description: "Final onboarding sign-off", status: "pending", uploadedFiles: [] }
];

const initialCandidates = (): Candidate[] => [
  {
    id: "candidate-marcus",
    name: "Marcus",
    email: "candidate@healthcare.com",
    phone: "(555) 234-5678",
    jobTitle: "ICU Registered Nurse",
    recruiterName: "Mani",
    recruiterEmail: "sarah.t@staffhc.com",
    candidateNo: "67288",
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
    currentStep: 3,
    stepStatus: "stuck",
    stuckReason: "Upload Professional Nursing License",
    stuckExplanation: "Missing or expired license file. Please upload a valid Professional Nursing License.",
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
    drugCheckStatus: "Pending",
    anomalyAlert: "signature form name mismatch — please re-upload"
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
    currentStep: 3,
    stepStatus: "in_progress",
    onboardingSteps: defaultSteps().map((s, idx) => ({
      ...s,
      status: idx < 2 ? "completed" as const : idx === 2 ? "in_progress" : "pending"
    })),
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
    recruiterEmail: "sarah.t@staffhc.com",
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
    currentStep: 3,
    stepStatus: "stuck",
    stuckReason: "Missing Background Authorization Form",
    stuckExplanation: "Background verification cannot begin without a signed FCRA Consent form.",
    onboardingSteps: defaultSteps(),
    erpDocuments: [
      { name: "Background Check Consent", fileName: "-", submissionStatus: "Pending", approvalStatus: "Waiting" }
    ],
    erpPlacementItems: [
      { name: "Purchase Order", status: "Pending" },
      { name: "E-Verification", status: "Pending" }
    ],
    backgroundStatus: "Pending",
    drugCheckStatus: "Pending",
    slaStatus: "breached",
    slaBreachDetails: "Background Check SLA breached by 48 hours. Escalate to compliance manager immediately."
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
    currentStep: 7,
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
    currentStep: 7,
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
    currentStep: 7,
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
    currentStep: 3,
    stepStatus: "in_progress",
    onboardingSteps: defaultSteps(),
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
    currentStep: 1,
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
    candidateId: "candidate-marcus",
    sender: "recruiter",
    senderName: "Mani",
    text: "Hi Marcus! I've reviewed your screening. You just need to upload that license file and we can move to interviews.",
    timestamp: "10:45 AM",
  },
  {
    id: "msg-2",
    candidateId: "candidate-marcus",
    sender: "candidate",
    senderName: "Marcus",
    text: "Thanks Sarah! Doing it now.",
    timestamp: "10:48 AM",
  }
];

const initialNotifications = (): NotificationLog[] => [
  {
    id: "notif-1",
    candidateId: "candidate-marcus",
    recipient: "candidate",
    recipientName: "Marcus",
    channel: "email",
    subject: "Action Required: Complete Onboarding Step 3",
    message: "Hi Marcus, your credentials package is missing your Nursing License file. Please log in to your dashboard to upload it.",
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
  }
];

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [notifications, setNotifications] = useState<NotificationLog[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<OnboardingContextType["loggedInUser"]>(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

  useEffect(() => {
    const savedCandidates = localStorage.getItem("staffhc_candidates_v3");
    const savedMessages = localStorage.getItem("staffhc_messages_v3");
    const savedNotifs = localStorage.getItem("staffhc_notifications_v3");
    const savedUser = localStorage.getItem("staffhc_logged_user_v3");

    if (savedCandidates) {
      setCandidates(JSON.parse(savedCandidates));
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
      setLoggedInUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (candidates.length > 0) {
      localStorage.setItem("staffhc_candidates_v3", JSON.stringify(candidates));
    }
  }, [candidates]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("staffhc_messages_v3", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem("staffhc_notifications_v3", JSON.stringify(notifications));
    }
  }, [notifications]);

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("staffhc_logged_user_v3", JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem("staffhc_logged_user_v3");
    }
  }, [loggedInUser]);

  const login = (email: string, role: "candidate" | "recruiter") => {
    const cleanEmail = email.toLowerCase().trim();
    if (role === "candidate") {
      const match = candidates.find(c => c.email.toLowerCase() === cleanEmail);
      if (match) {
        setLoggedInUser({ email: match.email, role: "candidate" });
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
        recruiterEmail: "sarah.t@staffhc.com",
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
        stepStatus: "in_progress",
        onboardingSteps: defaultSteps().map((s, idx) => ({
          ...s,
          status: idx === 0 ? "in_progress" : "pending"
        })),
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
      if (cleanEmail.includes("recruiter") || cleanEmail.includes("staffhc.com") || cleanEmail === "sarah.t@staffhc.com" || cleanEmail === "admin" || cleanEmail === "arun@example.com" || cleanEmail === "debra") {
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
        subject: "New Message from Sarah",
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

  const resetDemoState = () => {
    localStorage.removeItem("staffhc_candidates_v3");
    localStorage.removeItem("staffhc_messages_v3");
    localStorage.removeItem("staffhc_notifications_v3");
    localStorage.removeItem("staffhc_logged_user_v3");
    setCandidates(initialCandidates());
    setMessages(initialMessages());
    setNotifications(initialNotifications());
    setLoggedInUser(null);
    setSelectedCandidateId(null);
  };

  return (
    <OnboardingContext.Provider
      value={{
        candidates,
        messages,
        notifications,
        loggedInUser,
        selectedCandidateId,
        login,
        logout,
        setSelectedCandidateId,
        sendCandidateMessage,
        uploadDocument,
        resolveStep,
        resolveERPDocument,
        resolveERPPlacement,
        triggerReminder,
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
