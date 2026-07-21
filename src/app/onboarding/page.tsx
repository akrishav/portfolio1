"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DemoNavbar from "@/components/DemoNavbar";
import Logo from "@/components/Logo";
import { useOnboarding } from "@/components/OnboardingState";
import { 
  Lock, Mail, KeyRound, CheckCircle2, AlertTriangle, Send, 
  UploadCloud, FileText, Check, ArrowRight, User, Clock, 
  Bell, File, CheckCircle, ShieldAlert, AlertCircle, Layout, 
  Settings, HelpCircle, LogOut, ChevronRight, MessageSquare, Inbox, DollarSign, ChevronDown, X
} from "lucide-react";

interface SubStep {
  id: string;
  name: string;
  stepNumber: number;
  isOptional?: boolean;
}

interface Group {
  name: string;
  subSteps: SubStep[];
}

const ONBOARDING_GROUPS: Group[] = [
  {
    name: "Personal Information",
    subSteps: [
      { id: "personal_details", name: "Personal Details", stepNumber: 1 },
      { id: "addresses", name: "Addresses", stepNumber: 2 },
      { id: "emergency_contact", name: "Emergency Contact", stepNumber: 4 }
    ]
  },
  {
    name: "Employment",
    subSteps: [
      { id: "equal_employment", name: "Equal Employment", stepNumber: 3 },
      { id: "client_onboarding", name: "Client Onboarding Form", stepNumber: 5 },
      { id: "i9_eligibility", name: "I-9 Eligibility", stepNumber: 7 },
      { id: "education_details", name: "Education Details", stepNumber: 12, isOptional: true },
      { id: "previous_employers", name: "Previous Employers", stepNumber: 13, isOptional: true }
    ]
  },
  {
    name: "Payroll",
    subSteps: [
      { id: "w4_withholding", name: "W-4 Withholding", stepNumber: 9 },
      { id: "state_withholding", name: "State Withholding", stepNumber: 10 },
      { id: "method_of_payment", name: "Method of Payment", stepNumber: 11 }
    ]
  },
  {
    name: "Benefits",
    subSteps: [
      { id: "benefits_election", name: "Benefits Election", stepNumber: 6 }
    ]
  },
  {
    name: "Documents",
    subSteps: [
      { id: "agreements_signatures", name: "Agreements & Signatures", stepNumber: 8 },
      { id: "required_uploads", name: "Required Uploads", stepNumber: 14 }
    ]
  },
  {
    name: "Review",
    subSteps: [
      { id: "review_submit", name: "Review & Submit", stepNumber: 15 }
    ]
  }
];

export default function OnboardingPage() {
  const { 
    candidates, 
    messages, 
    notifications, 
    loggedInUser, 
    login, 
    logout, 
    sendCandidateMessage, 
    uploadDocument,
    updateCandidateStepStatus
  } = useOnboarding();

  // Login Form States
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [loginError, setLoginError] = useState("");

  // Menu active state: overview | documents | messages | emails | settings
  const [activeMenu, setActiveMenu] = useState<"overview" | "documents" | "messages" | "emails" | "settings">("overview");

  // Active Header Tab: dashboard | onboard
  const [activeHeaderTab, setActiveHeaderTab] = useState<"dashboard" | "onboard">("dashboard");

  // Mobile / Tablet Tab switching state (Active panel when not on full 3-column desktop)
  const [mobileActiveTab, setMobileActiveTab] = useState<"overview" | "documents" | "chat">("overview");

  // Stepper state
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [activeSubStepIndex, setActiveSubStepIndex] = useState(0);
  const [showFullChecklist, setShowFullChecklist] = useState(false);

  // Chat/Notification state
  const [chatMessage, setChatMessage] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [unreadChatCount, setUnreadChatCount] = useState(1);

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Document uploading modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTargetStep, setUploadTargetStep] = useState<number>(14);
  const [uploadFileName, setUploadFileName] = useState("Nursing_License_Mani.pdf");
  const [uploading, setUploading] = useState(false);

  // Success submitting onboarding modal state
  const [showSubmitSuccessModal, setShowSubmitSuccessModal] = useState(false);

  // Interactive Form Field States
  const [personalDetails, setPersonalDetails] = useState({
    fullName: "Mani Ganesan",
    email: "mani@staffhc.com",
    phone: "(512) 555-0199",
    ssn: "XXX-XX-1234"
  });
  const [addressDetails, setAddressDetails] = useState({
    address1: "1042 Maple Ave",
    city: "Austin",
    state: "TX",
    zip: "78701"
  });
  const [emergencyDetails, setEmergencyDetails] = useState({
    contactName: "Priya Ganesan",
    relationship: "Spouse",
    phone: "(512) 555-0188"
  });
  const [employmentDetails, setEmploymentDetails] = useState({
    gender: "Male",
    ethnicity: "Asian",
    veteranStatus: "No",
    specialty: "ICU RN",
    shifts: "Night Shift",
    locations: "Austin Metro",
    i9DocNum: "A12345678",
    i9Expiry: "2029-05-15",
    citizenStatus: "US Citizen",
    degree: "Bachelor of Science in Nursing",
    institution: "University of Texas at Austin",
    gradYear: "2015",
    lastEmployer: "St. David's Medical Center",
    lastRole: "Charge Nurse",
    yearsWorked: "4"
  });
  const [payrollDetails, setPayrollDetails] = useState({
    filingStatus: "Single",
    allowances: "0",
    extraWithholding: "0",
    stateFilingStatus: "Single",
    paymentMethod: "Direct Deposit",
    bankName: "Chase Bank",
    routingNumber: "111000612",
    accountNumber: "******8822"
  });
  const [benefitsDetails, setBenefitsDetails] = useState({
    medicalSelected: true,
    dentalSelected: true,
    visionSelected: false,
    benefitsWaived: false
  });
  const [documentsDetails, setDocumentsDetails] = useState({
    signedHandbook: true,
    signed401k: true,
    signedOfferLetter: false,
    signedDrugCheck: true,
    signedPayrollAck: true,
    signature: ""
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("login") === "true") {
        logout();
      }
    }
  }, []);

  const candidate = candidates.find((c) => {
    const cleanEmail = loggedInUser?.email?.toLowerCase();
    const emailToMatch = cleanEmail === "candidate@healthcare.com" ? "mani@staffhc.com" : cleanEmail;
    return c.email.toLowerCase() === emailToMatch;
  });

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setOtpSent(true);
    setLoginError("");
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) return;
    const emailToUse = email ? email : "candidate@healthcare.com";
    const success = login(emailToUse, "candidate");
    if (success) {
      setLoginError("");
      setOtpSent(false);
      setOtpCode("");
    } else {
      setLoginError("Invalid verification code.");
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage || !candidate) return;
    sendCandidateMessage(candidate.id, chatMessage, "candidate");
    setChatMessage("");
  };

  const triggerUploadFile = (stepNumber: number, defaultName: string) => {
    setUploadTargetStep(stepNumber);
    setUploadFileName(defaultName);
    setShowUploadModal(true);
  };

  const handleUploadSubmit = () => {
    if (!candidate) return;
    setUploading(true);
    setTimeout(() => {
      uploadDocument(candidate.id, uploadTargetStep, uploadFileName, "1.6 MB");
      updateCandidateStepStatus(candidate.id, uploadTargetStep, "completed");
      setUploading(false);
      setShowUploadModal(false);
    }, 1000);
  };

  // Group completion check
  const isGroupCompleted = (groupIndex: number) => {
    if (!candidate) return false;
    const group = ONBOARDING_GROUPS[groupIndex];
    if (group.name === "Review") return false;
    
    return group.subSteps.every(sub => {
      if (sub.isOptional) return true;
      const stepState = candidate.onboardingSteps.find(st => st.number === sub.stepNumber);
      return stepState?.status === "completed";
    });
  };

  const getCompletedGroupsCount = () => {
    let count = 0;
    for (let i = 0; i < 5; i++) {
      if (isGroupCompleted(i)) {
        count++;
      }
    }
    return count;
  };

  // Progress logic
  const getRequiredStepsCompletedCount = () => {
    if (!candidate) return 0;
    const requiredStepNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 14];
    return requiredStepNumbers.filter(num => {
      const step = candidate.onboardingSteps.find(s => s.number === num);
      return step?.status === "completed";
    }).length;
  };

  const getOverallProgressPercentage = () => {
    const completed = getRequiredStepsCompletedCount();
    return Math.round((completed / 12) * 100);
  };

  const findFirstIncompleteSubStep = () => {
    if (!candidate) return { groupIndex: 0, subStepIndex: 0 };
    for (let g = 0; g < ONBOARDING_GROUPS.length; g++) {
      const group = ONBOARDING_GROUPS[g];
      for (let s = 0; s < group.subSteps.length; s++) {
        const sub = group.subSteps[s];
        if (sub.id === "review_submit") continue;
        const stepState = candidate.onboardingSteps.find(st => st.number === sub.stepNumber);
        if (!sub.isOptional && stepState?.status !== "completed") {
          return { groupIndex: g, subStepIndex: s };
        }
      }
    }
    return { groupIndex: 5, subStepIndex: 0 };
  };

  const getCurrentSubStepInfo = () => {
    const { groupIndex, subStepIndex } = findFirstIncompleteSubStep();
    const group = ONBOARDING_GROUPS[groupIndex];
    const subStep = group.subSteps[subStepIndex];
    return {
      groupIndex,
      subStepIndex,
      groupName: group.name,
      subStepName: subStep.name,
      plainText: `Continue: ${group.name} ➔ ${subStep.name}`
    };
  };

  const handleResumeOnboarding = () => {
    const { groupIndex, subStepIndex } = findFirstIncompleteSubStep();
    setActiveGroupIndex(groupIndex);
    setActiveSubStepIndex(subStepIndex);
    setActiveHeaderTab("onboard");
  };

  const handleGroupClick = (groupIndex: number) => {
    setActiveGroupIndex(groupIndex);
    const group = ONBOARDING_GROUPS[groupIndex];
    if (!candidate) {
      setActiveSubStepIndex(0);
      return;
    }
    let targetIndex = 0;
    for (let s = 0; s < group.subSteps.length; s++) {
      const sub = group.subSteps[s];
      const stepState = candidate.onboardingSteps.find(st => st.number === sub.stepNumber);
      if (stepState?.status !== "completed") {
        targetIndex = s;
        break;
      }
    }
    setActiveSubStepIndex(targetIndex);
  };

  const handleNextStep = (stepNumber: number) => {
    if (candidate) {
      updateCandidateStepStatus(candidate.id, stepNumber, "completed");
    }
    const currentGroup = ONBOARDING_GROUPS[activeGroupIndex];
    if (activeSubStepIndex < currentGroup.subSteps.length - 1) {
      setActiveSubStepIndex(prev => prev + 1);
    } else if (activeGroupIndex < ONBOARDING_GROUPS.length - 1) {
      setActiveGroupIndex(prev => prev + 1);
      setActiveSubStepIndex(0);
    }
  };

  const handlePrevStep = () => {
    if (activeSubStepIndex > 0) {
      setActiveSubStepIndex(prev => prev - 1);
    } else if (activeGroupIndex > 0) {
      const prevGroupIdx = activeGroupIndex - 1;
      const prevGroup = ONBOARDING_GROUPS[prevGroupIdx];
      setActiveGroupIndex(prevGroupIdx);
      setActiveSubStepIndex(prevGroup.subSteps.length - 1);
    }
  };

  const getRemainingRequiredSteps = () => {
    if (!candidate) return 12;
    const requiredStepNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 14];
    const completed = requiredStepNumbers.filter(num => {
      const step = candidate.onboardingSteps.find(s => s.number === num);
      return step?.status === "completed";
    }).length;
    return 12 - completed;
  };

  // Messages for this candidate
  const candidateMessages = messages.filter((m) => m.candidateId === candidate?.id);

  // Filter emails
  const candidateEmails = notifications.filter(
    (n) => 
      n.candidateId === candidate?.id && 
      n.channel === "email" && 
      n.recipient === "candidate" && 
      !n.subject.toLowerCase().includes("anomaly") &&
      !n.subject.toLowerCase().includes("mismatch") &&
      !n.subject.toLowerCase().includes("tamper") &&
      !n.subject.toLowerCase().includes("checksum") &&
      !n.message.toLowerCase().includes("anomaly")
  );

  // Dynamic Forms rendering logic
  const renderActiveSubForm = () => {
    const group = ONBOARDING_GROUPS[activeGroupIndex];
    const subStep = group.subSteps[activeSubStepIndex];    switch (subStep.id) {
      case "personal_details":
        return (
          <div className="space-y-6">
            <div className="space-y-1 mb-4">
              <h4 className="text-base font-bold text-slate-800">Personal details</h4>
              <p className="text-xs text-slate-455 font-medium">Please verify your legal name and contact details.</p>
            </div>

            {/* Section 1: Identity */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-800 uppercase tracking-wider">Identity</span>
              </div>
              <div className="border-t border-slate-100 my-2"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Full legal name <span className="text-rose-500 font-bold">*</span></label>
                  <input 
                    type="text" 
                    value={personalDetails.fullName}
                    onChange={e => setPersonalDetails(p => ({ ...p, fullName: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Social security number <span className="text-rose-500 font-bold">*</span></label>
                  <input 
                    type="text" 
                    value={personalDetails.ssn}
                    onChange={e => setPersonalDetails(p => ({ ...p, ssn: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Contact */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-800 uppercase tracking-wider">Contact Details</span>
              </div>
              <div className="border-t border-slate-100 my-2"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Email address <span className="text-rose-500 font-bold">*</span></label>
                  <input 
                    type="email" 
                    value={personalDetails.email}
                    onChange={e => setPersonalDetails(p => ({ ...p, email: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Phone number <span className="text-rose-500 font-bold">*</span></label>
                  <input 
                    type="text" 
                    value={personalDetails.phone}
                    onChange={e => setPersonalDetails(p => ({ ...p, phone: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "addresses":
        return (
          <div className="space-y-6">
            <div className="space-y-1 mb-4">
              <h4 className="text-base font-bold text-slate-800">Permanent address</h4>
              <p className="text-xs text-slate-455 font-medium">Please provide your primary residence address details.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-800 uppercase tracking-wider">Mailing Address</span>
              </div>
              <div className="border-t border-slate-100 my-2"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-full space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Street address <span className="text-rose-500 font-bold">*</span></label>
                  <input 
                    type="text" 
                    value={addressDetails.address1}
                    onChange={e => setAddressDetails(p => ({ ...p, address1: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">City <span className="text-rose-500 font-bold">*</span></label>
                  <input 
                    type="text" 
                    value={addressDetails.city}
                    onChange={e => setAddressDetails(p => ({ ...p, city: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">State <span className="text-rose-500 font-bold">*</span></label>
                  <input 
                    type="text" 
                    value={addressDetails.state}
                    onChange={e => setAddressDetails(p => ({ ...p, state: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Zip code <span className="text-rose-500 font-bold">*</span></label>
                  <input 
                    type="text" 
                    value={addressDetails.zip}
                    onChange={e => setAddressDetails(p => ({ ...p, zip: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "emergency_contact":
        return (
          <div className="space-y-6">
            <div className="space-y-1 mb-4">
              <h4 className="text-base font-bold text-slate-800">Emergency contact</h4>
              <p className="text-xs text-slate-455 font-medium">Provide a contact in case of a medical or work emergency.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-800 uppercase tracking-wider">Primary Contact</span>
              </div>
              <div className="border-t border-slate-100 my-2"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Contact name <span className="text-rose-500 font-bold">*</span></label>
                  <input 
                    type="text" 
                    value={emergencyDetails.contactName}
                    onChange={e => setEmergencyDetails(p => ({ ...p, contactName: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Relationship <span className="text-rose-500 font-bold">*</span></label>
                  <input 
                    type="text" 
                    value={emergencyDetails.relationship}
                    onChange={e => setEmergencyDetails(p => ({ ...p, relationship: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[13px] font-medium text-slate-700 block">Phone number <span className="text-rose-500 font-bold">*</span></label>
                  <input 
                    type="text" 
                    value={emergencyDetails.phone}
                    onChange={e => setEmergencyDetails(p => ({ ...p, phone: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "equal_employment":
        return (
          <div className="space-y-6">
            <div className="space-y-1 mb-4">
              <h4 className="text-base font-bold text-slate-800">Equal employment disclosures</h4>
              <p className="text-xs text-slate-455 font-medium">Voluntary demographics statistics data requested under Federal regulations.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-800 uppercase tracking-wider">Demographics</span>
              </div>
              <div className="border-t border-slate-100 my-2"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Gender selection</label>
                  <select 
                    value={employmentDetails.gender}
                    onChange={e => setEmploymentDetails(p => ({ ...p, gender: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Decline">Decline to Self-Identify</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Race / ethnicity</label>
                  <select 
                    value={employmentDetails.ethnicity}
                    onChange={e => setEmploymentDetails(p => ({ ...p, ethnicity: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  >
                    <option value="Asian">Asian</option>
                    <option value="White">White / Caucasian</option>
                    <option value="Hispanic">Hispanic / Latino</option>
                    <option value="Black">Black / African American</option>
                    <option value="Decline">Decline to Self-Identify</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Veteran status</label>
                  <select 
                    value={employmentDetails.veteranStatus}
                    onChange={e => setEmploymentDetails(p => ({ ...p, veteranStatus: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  >
                    <option value="No">No, I am not a veteran</option>
                    <option value="Yes">Yes, protected veteran</option>
                    <option value="Decline">Decline to Self-Identify</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case "client_onboarding":
        return (
          <div className="space-y-6">
            <div className="space-y-1 mb-4">
              <h4 className="text-base font-bold text-slate-800">Client onboarding preference</h4>
              <p className="text-xs text-slate-455 font-medium">Verify your clinical specialty details for CDK Global assignment matching.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-800 uppercase tracking-wider">Placement Details</span>
              </div>
              <div className="border-t border-slate-100 my-2"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Clinical specialty <span className="text-rose-500 font-bold">*</span></label>
                  <input 
                    type="text" 
                    value={employmentDetails.specialty}
                    onChange={e => setEmploymentDetails(p => ({ ...p, specialty: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Shift preference <span className="text-rose-500 font-bold">*</span></label>
                  <input 
                    type="text" 
                    value={employmentDetails.shifts}
                    onChange={e => setEmploymentDetails(p => ({ ...p, shifts: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Placement location <span className="text-rose-500 font-bold">*</span></label>
                  <input 
                    type="text" 
                    value={employmentDetails.locations}
                    onChange={e => setEmploymentDetails(p => ({ ...p, locations: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "i9_eligibility":
        return (
          <div className="space-y-6">
            <div className="space-y-1 mb-4">
              <h4 className="text-base font-bold text-slate-800">Form I-9 eligibility details</h4>
              <p className="text-xs text-slate-455 font-medium">Submit verification document details matching your I-9 requirements.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-800 uppercase tracking-wider">Verification details</span>
              </div>
              <div className="border-t border-slate-100 my-2"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Work authorization status <span className="text-rose-500 font-bold">*</span></label>
                  <select 
                    value={employmentDetails.citizenStatus}
                    onChange={e => setEmploymentDetails(p => ({ ...p, citizenStatus: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  >
                    <option value="US Citizen">Citizen of the United States</option>
                    <option value="Noncitizen National">Noncitizen National of the United States</option>
                    <option value="Permanent Resident">Lawful Permanent Resident</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">List A document number <span className="text-rose-500 font-bold">*</span></label>
                  <input 
                    type="text" 
                    value={employmentDetails.i9DocNum}
                    onChange={e => setEmploymentDetails(p => ({ ...p, i9DocNum: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Expiration date <span className="text-rose-500 font-bold">*</span></label>
                  <input 
                    type="date" 
                    value={employmentDetails.i9Expiry}
                    onChange={e => setEmploymentDetails(p => ({ ...p, i9Expiry: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "education_details":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-800">Education details</h4>
                <p className="text-xs text-slate-455 font-medium">Add educational degrees or certifications to your candidate history (non-blocking).</p>
              </div>
              <span className="text-[9.5px] font-bold bg-[#EBF3FC] border border-[#DEEAF7] text-[#0052CC] px-2 py-0.5 rounded uppercase select-none shrink-0">Optional</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-800 uppercase tracking-wider">Degree details</span>
              </div>
              <div className="border-t border-slate-100 my-2"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Degree / certification</label>
                  <input 
                    type="text" 
                    value={employmentDetails.degree}
                    onChange={e => setEmploymentDetails(p => ({ ...p, degree: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Institution / school</label>
                  <input 
                    type="text" 
                    value={employmentDetails.institution}
                    onChange={e => setEmploymentDetails(p => ({ ...p, institution: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Graduation year</label>
                  <input 
                    type="text" 
                    value={employmentDetails.gradYear}
                    onChange={e => setEmploymentDetails(p => ({ ...p, gradYear: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "previous_employers":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-800">Previous employers</h4>
                <p className="text-xs text-slate-455 font-medium">List prior employment assignments or hospital networks (non-blocking).</p>
              </div>
              <span className="text-[9.5px] font-bold bg-[#EBF3FC] border border-[#DEEAF7] text-[#0052CC] px-2 py-0.5 rounded uppercase select-none shrink-0">Optional</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-800 uppercase tracking-wider">Employment history</span>
              </div>
              <div className="border-t border-slate-100 my-2"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Last employer name</label>
                  <input 
                    type="text" 
                    value={employmentDetails.lastEmployer}
                    onChange={e => setEmploymentDetails(p => ({ ...p, lastEmployer: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Role title</label>
                  <input 
                    type="text" 
                    value={employmentDetails.lastRole}
                    onChange={e => setEmploymentDetails(p => ({ ...p, lastRole: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Years worked</label>
                  <input 
                    type="text" 
                    value={employmentDetails.yearsWorked}
                    onChange={e => setEmploymentDetails(p => ({ ...p, yearsWorked: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "w4_withholding":
        return (
          <div className="space-y-6">
            <div className="space-y-1 mb-4">
              <h4 className="text-base font-bold text-slate-800">Federal IRS W-4 withholding</h4>
              <p className="text-xs text-slate-455 font-medium">Verify your IRS federal tax withholding allowances preference.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-800 uppercase tracking-wider">Federal withholding</span>
              </div>
              <div className="border-t border-slate-100 my-2"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Filing status <span className="text-rose-500 font-bold">*</span></label>
                  <select 
                    value={payrollDetails.filingStatus}
                    onChange={e => setPayrollDetails(p => ({ ...p, filingStatus: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  >
                    <option value="Single">Single / Married Filing Separately</option>
                    <option value="Married">Married Filing Jointly</option>
                    <option value="HeadOfHousehold">Head of Household</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">W-4 claim dependents <span className="text-rose-500 font-bold">*</span></label>
                  <input 
                    type="text" 
                    value={payrollDetails.allowances}
                    onChange={e => setPayrollDetails(p => ({ ...p, allowances: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Extra withholding amount ($) <span className="text-rose-500 font-bold">*</span></label>
                  <input 
                    type="text" 
                    value={payrollDetails.extraWithholding}
                    onChange={e => setPayrollDetails(p => ({ ...p, extraWithholding: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "state_withholding":
        return (
          <div className="space-y-6">
            <div className="space-y-1 mb-4">
              <h4 className="text-base font-bold text-slate-800">State tax withholding form</h4>
              <p className="text-xs text-slate-455 font-medium">Verify your state-level income tax filing status details.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-800 uppercase tracking-wider">State withholding</span>
              </div>
              <div className="border-t border-slate-100 my-2"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[13px] font-medium text-slate-700 block">State tax filing status <span className="text-rose-500 font-bold">*</span></label>
                  <select 
                    value={payrollDetails.stateFilingStatus}
                    onChange={e => setPayrollDetails(p => ({ ...p, stateFilingStatus: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  >
                    <option value="Single">Single / Separately</option>
                    <option value="Jointly">Married Filing Jointly</option>
                    <option value="Exempt">Exempt / No Income State</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case "method_of_payment":
        return (
          <div className="space-y-6">
            <div className="space-y-1 mb-4">
              <h4 className="text-base font-bold text-slate-800">Method of payment (direct deposit)</h4>
              <p className="text-xs text-slate-455 font-medium">Verify bank account details for direct deposit placement disbursements.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-800 uppercase tracking-wider">Account details</span>
              </div>
              <div className="border-t border-slate-100 my-2"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Bank name <span className="text-rose-500 font-bold">*</span></label>
                  <input 
                    type="text" 
                    value={payrollDetails.bankName}
                    onChange={e => setPayrollDetails(p => ({ ...p, bankName: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Routing transit number <span className="text-rose-500 font-bold">*</span></label>
                  <input 
                    type="text" 
                    value={payrollDetails.routingNumber}
                    onChange={e => setPayrollDetails(p => ({ ...p, routingNumber: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700 block">Account number <span className="text-rose-500 font-bold">*</span></label>
                  <input 
                    type="text" 
                    value={payrollDetails.accountNumber}
                    onChange={e => setPayrollDetails(p => ({ ...p, accountNumber: e.target.value }))}
                    className="w-full px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 text-xs font-semibold text-slate-805"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "benefits_election":
        return (
          <div className="space-y-6">
            <div className="space-y-1 mb-4">
              <h4 className="text-base font-bold text-slate-800">Benefits election</h4>
              <p className="text-xs text-slate-455 font-medium">Select your healthcare coverage and retirement plans, or submit a waiver.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-800 uppercase tracking-wider">Health Coverage Options</span>
              </div>
              <div className="border-t border-slate-100 my-2"></div>
              <div className="space-y-3.5">
                <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/50 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={benefitsDetails.medicalSelected}
                    onChange={e => setBenefitsDetails(p => ({ ...p, medicalSelected: e.target.checked, benefitsWaived: false }))}
                    className="h-4 w-4 rounded border-slate-300 text-[#0052CC] focus:ring-[#0052CC]"
                  />
                  <div className="text-left">
                    <span className="block text-xs font-bold text-slate-800">Standard Medical PPO Plan</span>
                    <span className="block text-[10px] text-slate-450 mt-0.5 font-semibold">Comprehensive coverage includes inpatient, outpatient, and prescriptions.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/50 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={benefitsDetails.dentalSelected}
                    onChange={e => setBenefitsDetails(p => ({ ...p, dentalSelected: e.target.checked, benefitsWaived: false }))}
                    className="h-4 w-4 rounded border-slate-300 text-[#0052CC] focus:ring-[#0052CC]"
                  />
                  <div className="text-left">
                    <span className="block text-xs font-bold text-slate-800">Premier Dental Coverage</span>
                    <span className="block text-[10px] text-slate-455 mt-0.5 font-semibold">Includes preventative diagnostic cleanings and basic/major restorative work.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/50 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={benefitsDetails.visionSelected}
                    onChange={e => setBenefitsDetails(p => ({ ...p, visionSelected: e.target.checked, benefitsWaived: false }))}
                    className="h-4 w-4 rounded border-slate-300 text-[#0052CC] focus:ring-[#0052CC]"
                  />
                  <div className="text-left">
                    <span className="block text-xs font-bold text-slate-800">Basic Vision Care Plan</span>
                    <span className="block text-[10px] text-slate-455 mt-0.5 font-semibold">Covers eye exams, corrective lenses, and allowance towards frames.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-rose-50/30 border border-rose-100 rounded-xl cursor-pointer hover:bg-rose-50/50 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={benefitsDetails.benefitsWaived}
                    onChange={e => setBenefitsDetails(p => ({ 
                      ...p, 
                      benefitsWaived: e.target.checked,
                      medicalSelected: !e.target.checked ? p.medicalSelected : false,
                      dentalSelected: !e.target.checked ? p.dentalSelected : false,
                      visionSelected: !e.target.checked ? p.visionSelected : false
                    }))}
                    className="h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                  />
                  <div className="text-left">
                    <span className="block text-xs font-bold text-rose-800">Waive All Corporate Health Benefits</span>
                    <span className="block text-[10px] text-rose-600/70 mt-0.5 font-semibold">Declining employer-sponsored health benefits. Proof of other coverage may be required.</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        );

      case "agreements_signatures":
        return (
          <div className="space-y-6">
            <div className="space-y-1 mb-4">
              <h4 className="text-base font-bold text-slate-800">Agreements & signatures</h4>
              <p className="text-xs text-slate-455 font-medium">Review and sign standard agreements required for your onboarding.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-800 uppercase tracking-wider">Required documents</span>
              </div>
              <div className="border-t border-slate-100 my-2"></div>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-xs font-bold text-slate-800 block">1. Employee Handbook Acknowledgment</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5 font-semibold">Acknowledged on file • Auto-Signed</span>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-xs font-bold text-slate-800 block">2. 401(k) Voluntary Enrollment Form</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5 font-semibold">Acknowledged on file • Auto-Signed</span>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-xs font-bold text-slate-800 block">3. Employee Offer Letter - Hourly(Weekly)</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5 font-semibold">
                      {documentsDetails.signedOfferLetter ? "Signed Successfully" : "Action Required • Signature Pending"}
                    </span>
                  </div>
                  {documentsDetails.signedOfferLetter ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  ) : (
                    <button 
                      onClick={() => {
                        const sig = prompt("Type your full name to sign your Employment Offer Letter contract:");
                        if (sig) {
                          setDocumentsDetails(d => ({ ...d, signedOfferLetter: true, signature: sig }));
                          setToastMessage("Employee Offer Letter signed successfully.");
                          setShowToast(true);
                          setTimeout(() => setShowToast(false), 3000);
                        }
                      }}
                      className="px-3 py-1.5 bg-[#0052CC] hover:bg-[#0042A3] text-white rounded-lg text-[10px] font-bold transition-all shadow-xs cursor-pointer shrink-0"
                    >
                      Sign Contract
                    </button>
                  )}
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-xs font-bold text-slate-800 block">4. Drug Check Policy & Consent Form</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5 font-semibold">Acknowledged on file • Auto-Signed</span>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-xs font-bold text-slate-800 block">5. Payroll Procedures & Acknowledgment</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5 font-semibold">Acknowledged on file • Auto-Signed</span>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                </div>

                {documentsDetails.signedOfferLetter && (
                  <div className="pt-2 text-left space-y-1.5">
                    <label className="text-[13px] font-medium text-slate-700 block">Legal signature representation</label>
                    <input 
                      type="text" 
                      value={documentsDetails.signature}
                      onChange={e => setDocumentsDetails(p => ({ ...p, signature: e.target.value }))}
                      className="w-full max-w-sm px-3 h-10 border border-slate-205 rounded-xl focus:border-[#0052CC] focus:outline-none bg-slate-50 font-serif italic font-semibold text-slate-705"
                      placeholder="Typed Legal Name Signature"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "required_uploads":
        return (
          <div className="space-y-6">
            <div className="space-y-1 mb-4">
              <h4 className="text-base font-bold text-slate-800">Required document uploads</h4>
              <p className="text-xs text-slate-455 font-medium">Upload physical files representing credential licenses or healthcare screenings.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-800 uppercase tracking-wider">Document uploads</span>
              </div>
              <div className="border-t border-slate-100 my-2"></div>
              <div className="space-y-4">
                {/* Professional License upload slot */}
                <div className="border border-slate-200 bg-slate-50/50 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left">
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">Professional Nursing License</h5>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5 font-semibold">State registered nursing license registry proof (PDF/JPEG).</p>
                    
                    {candidate?.onboardingSteps[13]?.status === "completed" ? (
                      <div className="mt-2 text-emerald-600 text-[10px] font-bold flex items-center gap-1">
                        <Check className="h-3.5 w-3.5 stroke-[3px]" /> 
                        <span>License_Mani.pdf - Awaiting compliance review</span>
                      </div>
                    ) : candidate?.stepStatus === "stuck" ? (
                      <div className="mt-2 bg-rose-50 border border-rose-100 rounded-lg p-2.5 text-[10px] text-rose-800 font-bold flex items-start gap-2 max-w-lg">
                        <ShieldAlert className="h-4.5 w-4.5 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="block uppercase tracking-wider text-[8px] font-black text-rose-700">Blocker Anomaly Flagged</span>
                          <span>SSN and Name mismatches detected on uploaded file. Please click upload below to upload a verified copy.</span>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div>
                    {candidate?.onboardingSteps[13]?.status === "completed" ? (
                      <div className="h-8 w-8 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 text-emerald-500">
                        <Check className="h-4 w-4" />
                      </div>
                    ) : (
                      <button 
                        onClick={() => triggerUploadFile(14, "Nursing_License_Mani.pdf")}
                        className="h-10 px-4 bg-[#0052CC] hover:bg-[#0042A3] text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                      >
                        Upload File
                      </button>
                    )}
                  </div>
                </div>

                {/* Immunization records upload slot */}
                <div className="border border-slate-200 bg-slate-50/50 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left">
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">Immunization Records</h5>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5 font-semibold">Tuberculosis screening and Hepatitis B series records.</p>
                  </div>
                  <div>
                    <button 
                      onClick={() => triggerUploadFile(14, "Immunization_Records_Mani.pdf")}
                      className="h-10 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-200 text-xs font-bold transition-all cursor-pointer"
                    >
                      Upload File
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "review_submit":
        return (
          <div className="space-y-6 text-left">
            <div className="space-y-1 mb-4">
              <h4 className="text-base font-bold text-slate-800">Review & submit onboarding</h4>
              <p className="text-xs text-slate-455 font-medium">Verify your entered profile parameters before locking and exporting.</p>
            </div>
            
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 no-scrollbar text-xs">
              {/* Personal Details Group */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
                <button 
                  onClick={() => { setActiveGroupIndex(0); setActiveSubStepIndex(0); }}
                  className="absolute top-3.5 right-4 text-[10px] font-black text-[#0052CC] hover:underline uppercase tracking-wide cursor-pointer"
                >
                  Edit
                </button>
                <h5 className="font-bold text-slate-800 text-xs">Personal information</h5>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div><strong>Legal name:</strong> {personalDetails.fullName}</div>
                  <div><strong>Email address:</strong> {personalDetails.email}</div>
                  <div><strong>Phone number:</strong> {personalDetails.phone}</div>
                  <div><strong>Street address:</strong> {addressDetails.address1}, {addressDetails.city}, {addressDetails.state} {addressDetails.zip}</div>
                  <div><strong>Emergency contact:</strong> {emergencyDetails.contactName} ({emergencyDetails.relationship}) — {emergencyDetails.phone}</div>
                </div>
              </div>

              {/* Employment Group */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
                <button 
                  onClick={() => { setActiveGroupIndex(1); setActiveSubStepIndex(0); }}
                  className="absolute top-3.5 right-4 text-[10px] font-black text-[#0052CC] hover:underline uppercase tracking-wide cursor-pointer"
                >
                  Edit
                </button>
                <h5 className="font-bold text-slate-800 text-xs">Employment parameters</h5>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div><strong>Clinical specialty:</strong> {employmentDetails.specialty}</div>
                  <div><strong>Shift preference:</strong> {employmentDetails.shifts}</div>
                  <div><strong>Placement location:</strong> {employmentDetails.locations}</div>
                  <div><strong>I-9 document:</strong> {employmentDetails.citizenStatus} ({employmentDetails.i9DocNum})</div>
                  <div><strong>Degree (optional):</strong> {employmentDetails.degree || "Not Provided"}</div>
                  <div><strong>Last employer (optional):</strong> {employmentDetails.lastEmployer || "Not Provided"}</div>
                </div>
              </div>

              {/* Payroll Group */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
                <button 
                  onClick={() => { setActiveGroupIndex(2); setActiveSubStepIndex(0); }}
                  className="absolute top-3.5 right-4 text-[10px] font-black text-[#0052CC] hover:underline uppercase tracking-wide cursor-pointer"
                >
                  Edit
                </button>
                <h5 className="font-bold text-slate-800 text-xs">Payroll & taxes</h5>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div><strong>Filing status:</strong> {payrollDetails.filingStatus}</div>
                  <div><strong>W-4 dependents:</strong> {payrollDetails.allowances}</div>
                  <div><strong>Method of payment:</strong> {payrollDetails.paymentMethod}</div>
                  <div><strong>Direct deposit bank:</strong> {payrollDetails.bankName} (Acct: {payrollDetails.accountNumber})</div>
                </div>
              </div>

              {/* Benefits Group */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
                <button 
                  onClick={() => { setActiveGroupIndex(3); setActiveSubStepIndex(0); }}
                  className="absolute top-3.5 right-4 text-[10px] font-black text-[#0052CC] hover:underline uppercase tracking-wide cursor-pointer"
                >
                  Edit
                </button>
                <h5 className="font-bold text-slate-800 text-xs">Benefits selections</h5>
                <div className="text-[11px] text-slate-600">
                  {benefitsDetails.benefitsWaived ? (
                    <span className="text-rose-605 font-bold uppercase">All benefits declined/waived</span>
                  ) : (
                    <span className="font-semibold">Enrolled plans: {benefitsDetails.medicalSelected && "Medical PPO, "} {benefitsDetails.dentalSelected && "Dental, "} {benefitsDetails.visionSelected && "Vision"}</span>
                  )}
                </div>
              </div>

              {/* Documents Group */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
                <button 
                  onClick={() => { setActiveGroupIndex(4); setActiveSubStepIndex(0); }}
                  className="absolute top-3.5 right-4 text-[10px] font-black text-[#0052CC] hover:underline uppercase tracking-wide cursor-pointer"
                >
                  Edit
                </button>
                <h5 className="font-bold text-slate-800 text-xs">Signatures & agreements</h5>
                <div className="text-[11px] text-slate-600 space-y-1">
                  <div><strong>Signature:</strong> <span className="font-serif italic font-bold">{documentsDetails.signature || "Not Signed"}</span></div>
                  <div><strong>Offer letter status:</strong> {documentsDetails.signedOfferLetter ? "Signed successfully" : "Pending signature"}</div>
                </div>
              </div>
            </div>

            {/* Status Banner */}
            <div className="pt-2">
              {getRemainingRequiredSteps() > 0 ? (
                <span className="text-[10px] font-bold uppercase bg-rose-50 text-rose-600 border border-rose-100 rounded px-2.5 py-1.5 flex items-center gap-1.5 select-none w-fit">
                  <Lock className="h-3 w-3" /> {getRemainingRequiredSteps()} required sections remaining
                </span>
              ) : (
                <span className="text-[10px] font-bold uppercase bg-emerald-50 text-emerald-600 border border-emerald-100 rounded px-2.5 py-1.5 flex items-center gap-1.5 select-none w-fit">
                  <Check className="h-3 w-3 stroke-[3px]" /> Checklist complete! Ready to submit.
                </span>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // If not logged in, render OTP Login Form
  if (!loggedInUser || loggedInUser.role !== "candidate" || !candidate) {
    return (
      <main className="min-h-screen bg-[#F4F6FC] text-[#1E293B] flex flex-col font-sans antialiased">
        <DemoNavbar />

        {/* Header matching Image 2 */}
        <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-40">
          <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/staffhc-logo.png"
                alt="Staff HC Logo"
                className="h-6.5 object-contain select-none pointer-events-none"
              />
              <span className="text-slate-350 font-normal text-lg">|</span>
              <span className="text-xs font-bold text-[#0052CC] uppercase tracking-wider">Onboarding</span>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-500">
              <Link href="/jobs" className="hover:text-[#0052CC]">Find Jobs</Link>
              <Link href="/onboarding" className="text-[#0052CC]">Dashboard</Link>
              <Link href="/onboarding" className="hover:text-[#0052CC]">Onboard</Link>
            </nav>

            <div className="flex items-center gap-4">
              <button className="text-slate-400 hover:text-slate-600 transition-colors">
                <Bell className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={() => {
                  setEmail("mani@staffhc.com");
                  setOtpSent(true);
                }}
                className="px-5 py-2.5 bg-[#0052CC] hover:bg-[#0042A3] text-white text-xs font-bold rounded-md transition-all shadow-sm"
              >
                Sign In
              </button>
            </div>
          </div>
        </header>

        {/* OTP Card matching Image 2 */}
        <div className="grow flex items-center justify-center px-4 py-16 relative z-10">
          <div className="w-full max-w-md bg-white border border-slate-205 rounded-2xl p-10 shadow-lg text-center">
            
            {/* Header Image/Icon representing Shield check document */}
            <div className="flex justify-center mb-6">
              <div className="h-20 w-24 bg-[#EBF3FC] border border-[#DEEAF7] rounded-xl flex items-center justify-center relative overflow-hidden shadow-inner">
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-[#0052CC]/10 rounded-full"></div>
                <div className="h-10 w-8 bg-[#0052CC]/15 border border-[#0052CC]/30 rounded flex flex-col justify-center items-center">
                  <div className="w-4 h-0.5 bg-[#0052CC]/45 my-0.5 rounded"></div>
                  <div className="w-4 h-0.5 bg-[#0052CC]/45 my-0.5 rounded"></div>
                  <Check className="h-3 w-3 text-[#0052CC] font-bold mt-1" />
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">Track Your Journey</h2>
            <p className="text-xs text-slate-500 mt-3 max-w-xs mx-auto leading-relaxed font-medium">
              Enter your email to access your personalized candidate dashboard and track your onboarding progress.
            </p>

            {loginError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-650 rounded-lg text-xs text-left">
                {loginError}
              </div>
            )}

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="mt-8 text-left space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Enter Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g., candidate@healthcare.com"
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0052CC] focus:ring-1 focus:ring-[#0052CC] transition-colors text-sm pl-11"
                    />
                    <Mail className="absolute left-4 top-3.5 h-4.5 w-4.5 text-slate-400" />
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-2 font-medium">
                    Enter <strong className="text-slate-700">mani@staffhc.com</strong>. We'll send a 6-digit security code to this address. (Demo — any email and any OTP will work)
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#0052CC] hover:bg-[#0042A3] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow"
                >
                  Send OTP
                  <ChevronRight className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="mt-8 text-left space-y-5">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-bold text-slate-700">
                      Enter Verification Code
                    </label>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-xs font-bold text-[#0052CC] hover:underline"
                    >
                      Change Email
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      className="w-full px-4 py-3 bg-white border border-slate-350 rounded-lg text-slate-850 placeholder-slate-400 focus:outline-none focus:border-[#0052CC] focus:ring-1 focus:ring-[#0052CC] transition-colors text-sm pl-11 text-center tracking-widest font-mono font-bold"
                    />
                    <KeyRound className="absolute left-4 top-3.5 h-4.5 w-4.5 text-slate-400" />
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-2 text-center font-medium">
                    Enter <strong className="text-slate-700">123456</strong> (or any code) to sign in.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#0052CC] hover:bg-[#0042A3] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Verify & Log In
                </button>
              </form>
            )}

            <div className="mt-6 text-center">
              <Link href="/" className="text-xs font-bold text-[#0052CC] hover:underline">
                Go back to Search Jobs
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F6FC] text-[#1E293B] flex flex-col font-sans antialiased">
      <DemoNavbar />

      <header className="bg-white border-b border-slate-100 shadow-sm z-30 shrink-0">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/staffhc-logo.png"
              alt="Staff HC Logo"
              className="h-6.5 object-contain select-none pointer-events-none"
            />
            <span className="text-slate-350 font-normal text-lg">|</span>
            <span className="text-xs font-bold text-[#0052CC] uppercase tracking-wider">Onboarding</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-500">
            <Link href="/jobs" className="hover:text-[#0052CC] transition-colors">Find Jobs</Link>
            <button
              onClick={() => { setActiveHeaderTab("dashboard"); setActiveMenu("overview"); }}
              className={`transition-colors pb-5 mt-5 border-[#0052CC] cursor-pointer ${activeHeaderTab === "dashboard" ? "text-[#0052CC] border-b-2 font-extrabold" : "hover:text-[#0052CC]"}`}
            >
              Dashboard
            </button>
            {!candidate?.hasNoApplication && (
              <button
                onClick={() => setActiveHeaderTab("onboard")}
                className={`transition-colors pb-5 mt-5 border-[#0052CC] cursor-pointer ${activeHeaderTab === "onboard" ? "text-[#0052CC] border-b-2 font-extrabold" : "hover:text-[#0052CC]"}`}
              >
                Onboard
              </button>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-slate-400 hover:text-slate-600 transition-colors relative p-1.5 hover:bg-slate-50 rounded-full cursor-pointer"
              >
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2.5 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-4 text-left animate-slide-in">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-3">
                    <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-800">Notifications</h3>
                    <button 
                      onClick={() => setShowNotifications(false)}
                      className="text-xs text-slate-400 hover:text-slate-600 font-bold"
                    >
                      Close
                    </button>
                  </div>
                  <div className="space-y-3.5 max-h-60 overflow-y-auto no-scrollbar text-xs font-semibold text-slate-600">
                    {notifications.filter(n => n.candidateId === candidate.id).slice(0, 5).map(n => (
                      <div key={n.id} className="pb-2 border-b border-slate-50 last:border-0">
                        <span className="block text-slate-800">{n.subject}</span>
                        <span className="block text-[10px] text-slate-400 mt-0.5">{n.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar Circle */}
            <div className="h-8 w-8 rounded-full overflow-hidden border border-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" 
                alt="User Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main dashboard content area split into sidebar, middle, and right columns */}
      {activeHeaderTab === "dashboard" ? (
        <div className="grow max-w-[1600px] w-full mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8 items-start">
          
          {/* COLUMN 1: LEFT SIDEBAR */}
          <aside className="w-full lg:w-60 bg-white border border-slate-200 rounded-2xl p-6 lg:flex flex-col h-[520px] shadow-sm justify-between shrink-0 hidden">
            <div className="space-y-6">
              <div className="px-3">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">
                  Hummingbird
                </span>
                <span className="text-xs font-semibold text-slate-550 block -mt-0.5">
                  Candidate Portal
                </span>
              </div>

              <nav className="space-y-1.5">
                <button
                  onClick={() => setActiveMenu("overview")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeMenu === "overview"
                      ? "bg-[#EBF3FC] text-[#0052CC]"
                      : "text-slate-500 hover:bg-slate-55 hover:text-slate-800"
                  }`}
                >
                  <Layout className="h-4.5 w-4.5" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveMenu("documents")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeMenu === "documents"
                      ? "bg-[#EBF3FC] text-[#0052CC]"
                      : "text-slate-500 hover:bg-slate-55 hover:text-slate-800"
                  }`}
                >
                  <FileText className="h-4.5 w-4.5" />
                  Documents
                </button>
                <button
                  onClick={() => setActiveMenu("emails")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeMenu === "emails"
                      ? "bg-[#EBF3FC] text-[#0052CC]"
                      : "text-slate-500 hover:bg-slate-55 hover:text-slate-800"
                  }`}
                >
                  <Inbox className="h-4.5 w-4.5" />
                  <span>Emails</span>
                  {candidateEmails.length > 0 && (
                    <span className="ml-auto bg-[#0052CC] text-white font-bold rounded-full text-[9px] w-4.5 h-4.5 flex items-center justify-center">
                      {candidateEmails.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveMenu("messages")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeMenu === "messages"
                      ? "bg-[#EBF3FC] text-[#0052CC]"
                      : "text-slate-500 hover:bg-slate-55 hover:text-slate-800"
                  }`}
                >
                  <Send className="h-4.5 w-4.5" />
                  Recruiter Chat
                </button>
                <button
                  onClick={() => setActiveMenu("settings")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeMenu === "settings"
                      ? "bg-[#EBF3FC] text-[#0052CC]"
                      : "text-slate-500 hover:bg-slate-55 hover:text-slate-800"
                  }`}
                >
                  <Settings className="h-4.5 w-4.5" />
                  Settings
                </button>
              </nav>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <button 
                onClick={() => alert("Candidate ID: " + candidate.candidateNo)}
                className="w-full py-2.5 bg-[#002677] hover:bg-[#001D5B] text-white text-xs font-bold rounded-lg transition-all cursor-pointer"
              >
                View ID Profile
              </button>
            </div>
          </aside>

          {/* COLUMN 2: MIDDLE CONTENT */}
          <section className="flex-1 space-y-6 w-full text-left">
            
            {activeMenu === "overview" && (
              <div className="space-y-6 animate-fade-in">
                {/* Welcome Header */}
                <div className="flex flex-col gap-1">
                  <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
                    Welcome back, {candidate.name}
                  </h1>
                  <p className="text-xs text-slate-400 font-medium">
                    Track your compliance progress and onboarding documents below.
                  </p>
                </div>

                {/* Compact Progress Summary (6 Groups Slim Horizontal Indicator) */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-sm">Onboarding Progress</h3>
                      <p className="text-[11px] text-slate-455 font-bold mt-0.5">
                        {getCompletedGroupsCount()} of 6 sections complete ({getOverallProgressPercentage()}% total progress)
                      </p>
                    </div>
                    {/* Status Chip */}
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 text-slate-455 rounded-full text-[10px] font-bold select-none">
                      <Lock className="h-3 w-3 text-slate-400" />
                      <span>Review & Submit unlocks after all sections are complete</span>
                    </div>
                  </div>

                  {/* Slim horizontal bar segments */}
                  <div className="grid grid-cols-6 gap-2 pt-1 h-3.5">
                    {ONBOARDING_GROUPS.map((grp, idx) => {
                      const isCompleted = isGroupCompleted(idx);
                      const isCurrent = findFirstIncompleteSubStep().groupIndex === idx;
                      return (
                        <div 
                          key={idx} 
                          className={`rounded-full transition-all duration-300 ${
                            isCompleted 
                              ? "bg-[#0052CC]" 
                              : isCurrent 
                              ? "bg-blue-200 border border-[#0052CC]" 
                              : "bg-slate-105 border border-slate-200"
                          }`}
                          title={`${grp.name} (${isCompleted ? "Complete" : isCurrent ? "Active" : "Pending"})`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Continue Onboarding Card */}
                {getRemainingRequiredSteps() > 0 ? (
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="space-y-1">
                      <span className="text-[9.5px] font-black uppercase text-[#0052CC] tracking-wider bg-[#EBF3FC] px-2 py-0.5 rounded border border-[#DEEAF7]">
                        Next Action
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-800 mt-2">
                        {getCurrentSubStepInfo().plainText}
                      </h3>
                      <p className="text-[10.5px] text-slate-400 font-medium flex items-center gap-1 mt-1">
                        <Clock className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                        <span>Please complete by July 09, 2026.</span>
                      </p>
                    </div>
                    <button 
                      onClick={handleResumeOnboarding}
                      className="px-5 py-2.5 bg-[#0052CC] hover:bg-[#0042A3] text-white text-xs font-black rounded-xl transition-all shadow-xs active:scale-95 flex items-center gap-2 cursor-pointer uppercase tracking-wider shrink-0"
                    >
                      <span>Resume Onboarding</span>
                      <ArrowRight className="h-3.5 w-3.5 stroke-[3px]" />
                    </button>
                  </div>
                ) : (
                  <div className="bg-emerald-50/20 border border-emerald-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <span className="text-[9.5px] font-black uppercase text-[#007A5E] tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        Checklist Complete
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-800 mt-2">
                        All sections completed!
                      </h3>
                      <p className="text-[10.5px] text-slate-400 font-medium mt-1">
                        Please proceed to the Review group to submit your onboarding packet.
                      </p>
                    </div>
                    <button 
                      onClick={handleResumeOnboarding}
                      className="px-5 py-2.5 bg-[#007A5E] hover:bg-[#005E48] text-white text-xs font-black rounded-xl transition-all shadow-xs active:scale-95 flex items-center gap-2 cursor-pointer uppercase tracking-wider shrink-0"
                    >
                      <span>Proceed to Submit</span>
                      <ArrowRight className="h-3.5 w-3.5 stroke-[3px]" />
                    </button>
                  </div>
                )}

                {/* Offer Letter Card */}
                <div className="bg-[#002677] text-white rounded-3xl p-6 shadow-md relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-5"></div>
                  
                  <div className="space-y-2 relative z-10 text-left">
                    <span className="text-[9px] font-black uppercase tracking-wider bg-white/10 px-2.5 py-0.5 rounded border border-white/20 select-none">
                      Contract Package
                    </span>
                    <h3 className="text-base font-extrabold mt-1">Employee Offer Letter — Hourly(Weekly)</h3>
                    <p className="text-[11px] text-slate-200 leading-relaxed font-semibold max-w-lg">
                      Legal employment offer contract specifying hourly travel rate, compliance terms, and CDK Global placement benefits.
                    </p>
                    
                    <div className="pt-2">
                      {candidate.onboardingSteps[7]?.status === "completed" || documentsDetails.signedOfferLetter ? (
                        <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-bold">
                          <CheckCircle2 className="h-4.5 w-4.5" />
                          <span>Offer Letter Signed & Accepted</span>
                        </div>
                      ) : (
                        <button 
                          onClick={() => {
                            setActiveGroupIndex(4); // Documents index
                            setActiveSubStepIndex(0); // Agreements sub-step index
                            setActiveHeaderTab("onboard");
                          }}
                          className="px-5 py-2.5 bg-white hover:bg-slate-100 text-[#002677] text-xs font-black rounded-xl transition-all shadow-xs cursor-pointer uppercase tracking-wider"
                        >
                          Review & Sign Contract
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="h-28 w-28 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 shrink-0 relative z-10 select-none">
                    <FileText className="h-14 w-14 text-white/50" />
                  </div>
                </div>

              </div>
            )}

            {/* Other sidebar views */}
            {activeMenu === "documents" && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-800 text-sm">Required Onboarding Credentials</h3>
                <p className="text-xs text-slate-400 font-medium">Below is a checklist of all regulatory compliance documents required for your placement.</p>
                <div className="divide-y divide-slate-150 text-xs font-medium space-y-3">
                  {candidate.onboardingSteps.map((step) => (
                    <div key={step.number} className="py-3 flex justify-between items-center">
                      <div>
                        <span className="font-bold block text-slate-800">Step {step.number}: {step.name}</span>
                        <span className="text-[10px] text-slate-455">{step.description}</span>
                      </div>
                      <div>
                        {step.status === "completed" ? (
                          <span className="text-emerald-500 font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded uppercase">Completed</span>
                        ) : (
                          <button 
                            onClick={() => triggerUploadFile(step.number, `${step.name.replace(/\s+/g, "_")}_doc.pdf`)}
                            className="px-3 py-1 bg-[#0052CC] text-white rounded font-bold hover:bg-[#0042A3] transition-colors cursor-pointer"
                          >
                            Upload File
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeMenu === "emails" && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
                <h3 className="font-bold text-slate-800 text-sm">Communications Records</h3>
                <p className="text-xs text-slate-400 font-medium">Official transactional email records sent to your profile email inbox.</p>
                <div className="divide-y divide-slate-100 space-y-4">
                  {candidateEmails.map(email => (
                    <div key={email.id} className="pt-4 first:pt-0 text-left space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">{email.subject}</h4>
                          <span className="text-[10px] text-slate-400 font-medium">To: {candidate.email} • {email.timestamp}</span>
                        </div>
                        <span className="text-[9px] uppercase font-bold text-[#0052CC] bg-[#EBF3FC] px-2 py-0.5 rounded border border-[#DEEAF7]">Delivered</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed bg-slate-50/50 p-3 rounded-lg border border-slate-100 whitespace-pre-line">{email.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeMenu === "messages" && (
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col h-[520px] justify-between">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full overflow-hidden border border-slate-100">
                      <img 
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop" 
                        alt="Recruiter Alex"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-slate-800">Alex (Recruiter)</h4>
                    <span className="text-[10px] text-slate-455 font-bold block">Online • Onboarding Coordinator</span>
                  </div>
                </div>

                <div className="grow overflow-y-auto py-3 space-y-3 no-scrollbar text-xs flex flex-col">
                  {candidateMessages.map((msg) => {
                    const isRecruiter = msg.sender === "recruiter";
                    const isSystem = msg.sender === "system";
                    if (isSystem) {
                      return (
                        <div key={msg.id} className="mx-auto bg-slate-100 text-slate-500 rounded px-2.5 py-1 text-[10px] font-semibold tracking-wide w-fit text-center my-1 select-none border border-slate-200">
                          {msg.text}
                        </div>
                      );
                    }
                    return (
                      <div 
                        key={msg.id} 
                        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-left text-xs ${
                          isRecruiter 
                            ? "bg-slate-100 text-slate-700 self-start rounded-tl-none font-medium leading-relaxed" 
                            : "bg-[#0052CC] text-white self-end rounded-tr-none font-medium leading-relaxed shadow-sm"
                        }`}
                      >
                        <p>{msg.text}</p>
                        <span className={`block text-[8.5px] mt-1 text-right font-semibold ${isRecruiter ? "text-slate-400" : "text-white/70"}`}>
                          {msg.timestamp}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <form onSubmit={handleSendMessage} className="border-t border-slate-150 pt-3 flex gap-2">
                  <input 
                    type="text" 
                    value={chatMessage}
                    onChange={e => setChatMessage(e.target.value)}
                    placeholder="Type your message to Alex..."
                    className="grow px-4 py-2 text-xs border border-slate-205 rounded-xl bg-slate-50 focus:border-[#0052CC] focus:outline-none placeholder-slate-400 font-semibold"
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-[#0052CC] hover:bg-[#0042A3] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    Send
                  </button>
                </form>
              </div>
            )}

            {activeMenu === "settings" && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-left">
                <h3 className="font-bold text-slate-800 text-sm">Account Settings</h3>
                <p className="text-xs text-slate-400 font-medium">Manage your portal preferences and notification delivery methods.</p>
                <div className="space-y-4 max-w-md pt-2 text-xs">
                  <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <div>
                      <span className="font-bold block text-slate-800">Email Alerts</span>
                      <span className="text-[10px] text-slate-455">Receive SLA warnings via email</span>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4.5 w-4.5 rounded text-[#0052CC]" />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <div>
                      <span className="font-bold block text-slate-800">SMS Notifications</span>
                      <span className="text-[10px] text-slate-455">Receive direct text message pings</span>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4.5 w-4.5 rounded text-[#0052CC]" />
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      ) : (
        /* ONBOARD WORKSPACE TAB VIEW */
        <div className="grow max-w-[1600px] w-full mx-auto px-6 py-8 flex flex-col items-center">
          
          <section className="space-y-6 w-full text-left max-w-[880px]">
            <div className="flex flex-col gap-1">
              <h1 className="text-[28px] font-bold text-[#0F172A] tracking-tight leading-tight">
                Complete your onboarding
              </h1>
              <p className="text-sm text-slate-455 font-medium mt-1">
                Finish the sections below to wrap up your onboarding — about 15 minutes.
              </p>
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <span className="text-[11px] font-bold text-slate-455">
                Section {activeGroupIndex + 1} of 6 · {ONBOARDING_GROUPS[activeGroupIndex].name}
              </span>
            </div>

            {/* Connected 6-Group Stepper */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="h-2" />
              
              <div className="overflow-x-auto no-scrollbar pb-2">
                <div className="relative flex justify-between items-start w-full min-w-[700px] px-4">
                  {ONBOARDING_GROUPS.map((group, idx) => {
                    const isCompleted = isGroupCompleted(idx);
                    const isActive = activeGroupIndex === idx;
                    
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center relative z-10">
                        {/* Connection Line */}
                        {idx < ONBOARDING_GROUPS.length - 1 && (
                          <div 
                            className={`absolute top-5 left-[calc(50%+20px)] right-[calc(-50%+20px)] h-0.5 z-0 transition-colors duration-200 ${
                              isCompleted ? "bg-[#0052CC]" : "bg-slate-200"
                            }`} 
                          />
                        )}
                        
                        <button
                          onClick={() => handleGroupClick(idx)}
                          className="flex flex-col items-center focus:outline-none cursor-pointer group"
                        >
                          <div 
                            className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-black transition-all duration-200 border-2 ${
                              isActive 
                                ? "border-2 border-[#0052CC] bg-white text-[#0052CC] shadow-sm scale-105" 
                                : isCompleted
                                ? "border-[#0052CC] bg-[#0052CC] text-white"
                                : "border-slate-200 bg-slate-100 text-slate-400"
                            }`}
                          >
                            {isCompleted ? (
                              <Check className="h-5 w-5 stroke-[3px]" />
                            ) : (
                              <span>{idx + 1}</span>
                            )}
                          </div>
                          
                          <span 
                            className={`mt-2.5 text-[11px] leading-none whitespace-nowrap transition-all ${
                              isActive 
                                ? "font-bold text-[#0052CC]"
                                : isCompleted
                                ? "font-semibold text-slate-800"
                                : "font-medium text-slate-400"
                            }`}
                          >
                            {group.name}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sub-form container card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
              {/* Segmented Sub-step Navigation Row */}
              <div className="border-b border-slate-200 -mx-8 px-8 pb-3.5 mb-6">
                <div className="flex flex-wrap items-center gap-6">
                  {ONBOARDING_GROUPS[activeGroupIndex].subSteps.map((sub, idx) => {
                    const stepState = candidate.onboardingSteps.find(st => st.number === sub.stepNumber);
                    const isCompleted = stepState?.status === "completed";
                    const isStuck = stepState?.status === "stuck";
                    const isActive = activeSubStepIndex === idx;
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveSubStepIndex(idx)}
                        className={`pb-3.5 text-xs transition-all cursor-pointer flex items-center gap-2 font-bold relative -mb-3.5 ${
                          isActive
                            ? "text-[#0052CC] border-b-2 border-[#0052CC]"
                            : isCompleted
                            ? "text-[#007A5E] hover:text-[#005E48]"
                            : isStuck
                            ? "text-rose-600 hover:text-rose-700"
                            : "text-slate-400 hover:text-slate-600 font-semibold"
                        }`}
                      >
                        {isCompleted ? (
                          <div className="h-4.5 w-4.5 rounded-full bg-[#007A5E]/10 border border-[#007A5E]/20 text-[#007A5E] flex items-center justify-center">
                            <Check className="h-3 w-3 stroke-[3px]" />
                          </div>
                        ) : isStuck ? (
                          <div className="h-4.5 w-4.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
                            <AlertCircle className="h-3 w-3 stroke-[3px]" />
                          </div>
                        ) : isActive ? (
                          <div className="h-4.5 w-4.5 rounded-full bg-[#0052CC] text-white flex items-center justify-center text-[10px] font-black">
                            {idx + 1}
                          </div>
                        ) : (
                          <div className="h-4.5 w-4.5 rounded-full bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center text-[10px] font-bold">
                            {idx + 1}
                          </div>
                        )}
                        <span>{sub.name}</span>
                        {sub.isOptional && (
                          <span className="text-[8px] font-black bg-slate-100 text-slate-500 px-1 py-0.5 rounded select-none uppercase">
                            Optional
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic subform area */}
              <div className="py-1">
                {renderActiveSubForm()}
              </div>

              {/* Stepper Navigation Footer Action Strip */}
              <div className="bg-slate-55/75 border-t border-slate-200 px-8 py-5 -mx-8 -mb-8 rounded-b-2xl flex justify-between items-center mt-8">
                <div>
                  <button
                    onClick={handlePrevStep}
                    disabled={activeGroupIndex === 0 && activeSubStepIndex === 0}
                    className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent text-slate-700 rounded-lg text-xs font-bold transition-all cursor-pointer bg-white"
                  >
                    Back
                  </button>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setToastMessage("Progress saved successfully.");
                      setShowToast(true);
                      setTimeout(() => setShowToast(false), 3000);
                    }}
                    className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold transition-all cursor-pointer bg-white"
                  >
                    Save as Draft
                  </button>
                  {ONBOARDING_GROUPS[activeGroupIndex].subSteps[activeSubStepIndex].id !== "review_submit" ? (
                    <button
                      onClick={() => handleNextStep(ONBOARDING_GROUPS[activeGroupIndex].subSteps[activeSubStepIndex].stepNumber)}
                      className="px-4.5 py-2 bg-[#0052CC] hover:bg-[#0042A3] text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      {activeGroupIndex === 4 && activeSubStepIndex === ONBOARDING_GROUPS[activeGroupIndex].subSteps.length - 1 ? "Save & View Review" : "Save & Next"}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        updateCandidateStepStatus(candidate.id, 15, "completed");
                        setShowSubmitSuccessModal(true);
                      }}
                      disabled={getRemainingRequiredSteps() > 0}
                      className="px-4.5 py-2 bg-[#007A5E] hover:bg-[#005E48] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      Submit Onboarding
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Collapsed view full checklist accordion */}
            {/* Slim Accordion Checklist */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-xs">
              <button 
                onClick={() => setShowFullChecklist(!showFullChecklist)}
                className="w-full flex justify-between items-center px-5 py-3.5 font-semibold text-slate-700 text-xs hover:bg-slate-50/50 transition-colors focus:outline-none cursor-pointer"
              >
                <span>View full checklist</span>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="text-[10px] uppercase font-bold tracking-wider">
                    {showFullChecklist ? "Hide" : "Show"}
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showFullChecklist ? "rotate-180" : ""}`} />
                </div>
              </button>
              
              {showFullChecklist && (
                <div className="px-5 pb-5 border-t border-slate-100 divide-y divide-slate-100 text-xs font-semibold text-slate-655 space-y-4 pt-4">
                  {ONBOARDING_GROUPS.map((group, gIdx) => (
                    <div key={gIdx} className="pt-4 first:pt-0">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2.5">{group.name}</h4>
                      <div className="pl-4 space-y-2.5">
                        {group.subSteps.map((sub, sIdx) => {
                          const stepState = candidate.onboardingSteps.find(st => st.number === sub.stepNumber);
                          const isOptional = sub.isOptional;
                          const isDone = stepState?.status === "completed";
                          const isStuck = stepState?.status === "stuck";
                          return (
                            <div key={sIdx} className="flex justify-between items-center">
                              <span className="text-slate-800 font-bold">
                                {sub.name} {isOptional && <span className="text-[8px] font-black bg-blue-50 text-[#0052CC] border border-[#DEEAF7] px-1.5 py-0.5 rounded ml-1 uppercase">Optional</span>}
                              </span>
                              <span className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded uppercase border ${
                                isDone 
                                  ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                                  : isStuck
                                  ? "bg-rose-50 text-rose-600 border-rose-100 animate-pulse"
                                  : "bg-slate-50 text-slate-400 border-slate-100"
                              }`}>
                                {stepState?.status || "Pending"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </section>
        </div>
      )}

      {/* Simulated Upload modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-205 rounded-2xl p-6 w-full max-w-sm shadow-2xl space-y-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Simulate Document Upload</h3>
              <p className="text-xs text-slate-400 mt-1">Select a mock document for credential approval.</p>
            </div>
            
            <div className="space-y-3 text-xs text-left">
              <label className="block font-bold text-slate-700">File Name</label>
              <input
                type="text"
                value={uploadFileName}
                onChange={(e) => setUploadFileName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-205 rounded-lg text-slate-800 text-xs focus:outline-none"
              />
            </div>

            <div className="flex gap-3 justify-end text-xs">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 border border-slate-205 hover:bg-slate-55 text-slate-600 rounded-lg font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadSubmit}
                disabled={uploading}
                className="px-4 py-2 bg-[#0052CC] hover:bg-[#0042A3] disabled:bg-slate-400 text-white rounded-lg font-bold transition-all cursor-pointer"
              >
                {uploading ? "Uploading..." : "Upload File"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Success Modal */}
      {showSubmitSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 w-full max-w-md shadow-2xl text-center space-y-6">
            <div className="h-16 w-16 bg-emerald-50 text-emerald-500 border border-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 stroke-[3px]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-slate-800 tracking-tight">Onboarding Submitted Successfully!</h3>
              <p className="text-xs text-slate-455 leading-relaxed font-semibold">
                Your credentials and document packages have been submitted for final client verification. Our compliance auditors will review the packet shortly.
              </p>
            </div>
            <button
              onClick={() => {
                setShowSubmitSuccessModal(false);
                setActiveHeaderTab("dashboard");
                setActiveMenu("overview");
              }}
              className="w-full py-3 bg-[#0052CC] hover:bg-[#0042A3] text-white text-xs font-black rounded-xl transition-all shadow-md active:scale-95 uppercase tracking-wider cursor-pointer"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Floating Recruiter Chat Bubble & Overlay */}
      <div className="fixed bottom-6 right-24 z-40 flex flex-col items-end">
        {/* Floating Chat Bubble Button */}
        <button
          onClick={() => {
            setChatOpen(!chatOpen);
            setUnreadChatCount(0); // Mark read
          }}
          className="h-12 w-12 bg-[#0052CC] hover:bg-[#0042A3] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 border border-indigo-400/20 relative cursor-pointer"
          title="Chat with Recruiter"
        >
          <MessageSquare className="h-5.5 w-5.5" />
          {unreadChatCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[9px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white animate-bounce">
              {unreadChatCount}
            </span>
          )}
        </button>

        {/* Floating Chat Overlay Window */}
        {chatOpen && (
          <div className="fixed bottom-24 right-24 w-[380px] h-[480px] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col justify-between overflow-hidden animate-fade-in z-50">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-9 w-9 rounded-full overflow-hidden border border-slate-100">
                    <img 
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop" 
                      alt="Recruiter Alex" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 h-2 w-2 bg-emerald-500 rounded-full border border-white"></span>
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-slate-800">Alex (Recruiter)</h4>
                  <span className="text-[10px] text-slate-400 font-bold block">Online • Onboarding Coordinator</span>
                </div>
              </div>
              <button 
                onClick={() => setChatOpen(false)}
                className="text-slate-400 hover:text-slate-655 p-1 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Conversation Messages */}
            <div className="grow overflow-y-auto p-4 space-y-3.5 no-scrollbar text-xs flex flex-col bg-slate-50/30">
              {candidateMessages.map((msg) => {
                const isRecruiter = msg.sender === "recruiter";
                const isSystem = msg.sender === "system";
                if (isSystem) {
                  return (
                    <div key={msg.id} className="mx-auto bg-slate-105 text-slate-500 rounded-lg px-2.5 py-1 text-[10px] font-semibold w-fit border border-slate-150 my-1">
                      {msg.text}
                    </div>
                  );
                }
                return (
                  <div 
                    key={msg.id} 
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-left text-[11px] leading-normal font-medium ${
                      isRecruiter 
                        ? "bg-slate-100 text-slate-705 self-start rounded-tl-none" 
                        : "bg-[#0052CC] text-white self-end rounded-tr-none shadow-2xs"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className={`block text-[8.5px] mt-1 text-right font-semibold ${isRecruiter ? "text-slate-400" : "text-white/70"}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Message Input Footer */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 flex gap-2 bg-white">
              <input 
                type="text" 
                value={chatMessage}
                onChange={e => setChatMessage(e.target.value)}
                placeholder="Ask a question..."
                className="grow px-3.5 py-2.5 text-xs border border-slate-205 rounded-xl bg-slate-50 focus:border-[#0052CC] focus:outline-none placeholder-slate-400 font-semibold"
              />
              <button 
                type="submit"
                className="px-4 py-2.5 bg-[#0052CC] hover:bg-[#0042A3] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-slate-55 border-t border-slate-200 shrink-0 py-8">
        <div className="max-w-[1600px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-455 font-medium">
          <div>
            © 2026 Staff HC INC. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-600">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600">Terms of Service</a>
            <a href="#" className="hover:text-slate-600">Contact Us</a>
            <a href="#" className="hover:text-slate-600">FAQ</a>
          </div>
        </div>
      </footer>
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white text-xs font-bold px-4.5 py-3 rounded-xl shadow-xl z-[999] flex items-center gap-2">
          <Check className="h-4 w-4 text-emerald-400 stroke-[3px]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </main>
  );
}
