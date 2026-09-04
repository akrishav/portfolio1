"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  UserCheck,
  Bell,
  Moon,
  Eye,
  EyeOff,
  CheckCircle2,
  X,
  ArrowLeft,
  ShieldCheck,
  User
} from "lucide-react";

export default function SettingsPage() {
  const [activeMenu, setActiveMenu] = useState<"email" | "password" | "account" | "notifications" | "dnd">("password");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const [pwForm, setPwForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage("Password updated successfully!");
    setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1F1F1F] font-sans flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b border-[#DFEAF2] px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-4">
          <Link href="/onboarding" className="p-2 hover:bg-[#F8F9FA] rounded-md transition-colors text-[#4C4C4C]">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1A73E8] text-white font-bold flex items-center justify-center text-sm">
              H
            </div>
            <span className="text-lg font-bold text-[#1A73E8]">Hummingbird Settings</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#DFB400] text-white font-bold text-xs flex items-center justify-center">
            SG
          </div>
          <span className="text-xs font-medium text-[#1F1F1F]">Shreya Gupta</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-6xl mx-auto w-full space-y-6">
        {/* Banner Header */}
        <div className="bg-[#DFB400] text-white p-6 rounded-xl shadow-xs">
          <h2 className="text-2xl font-medium tracking-tight">Settings</h2>
          <p className="text-xs text-amber-50 mt-1">Update your information and control app behavior.</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Menu Items (4 cols) */}
          <div className="col-span-4 space-y-2">
            <button
              onClick={() => setActiveMenu("email")}
              className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                activeMenu === "email"
                  ? "bg-[#E8F4FF] border-[#1A73E8] shadow-xs"
                  : "bg-white border-[#DFEAF2] hover:bg-[#F8F9FA]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail className={`w-5 h-5 ${activeMenu === "email" ? "text-[#1A73E8]" : "text-[#797979]"}`} />
                <div>
                  <h4 className="text-xs font-semibold text-[#1F1F1F]">Email Address</h4>
                  <p className="text-[11px] text-[#797979] mt-0.5">Keep your contact information current to ensure uninterrupted communication.</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveMenu("password")}
              className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                activeMenu === "password"
                  ? "bg-[#E8F4FF] border-[#1A73E8] shadow-xs"
                  : "bg-white border-[#DFEAF2] hover:bg-[#F8F9FA]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Lock className={`w-5 h-5 ${activeMenu === "password" ? "text-[#1A73E8]" : "text-[#797979]"}`} />
                <div>
                  <h4 className="text-xs font-semibold text-[#1F1F1F]">Password</h4>
                  <p className="text-[11px] text-[#797979] mt-0.5">Enhance your account security by updating your password regularly.</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveMenu("account")}
              className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                activeMenu === "account"
                  ? "bg-[#E8F4FF] border-[#1A73E8] shadow-xs"
                  : "bg-white border-[#DFEAF2] hover:bg-[#F8F9FA]"
              }`}
            >
              <div className="flex items-center gap-3">
                <UserCheck className={`w-5 h-5 ${activeMenu === "account" ? "text-[#1A73E8]" : "text-[#797979]"}`} />
                <div>
                  <h4 className="text-xs font-semibold text-[#1F1F1F]">Manage Account</h4>
                  <p className="text-[11px] text-[#797979] mt-0.5">Manage your account settings, change settings, deactivate, or delete account.</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveMenu("notifications")}
              className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                activeMenu === "notifications"
                  ? "bg-[#E8F4FF] border-[#1A73E8] shadow-xs"
                  : "bg-white border-[#DFEAF2] hover:bg-[#F8F9FA]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Bell className={`w-5 h-5 ${activeMenu === "notifications" ? "text-[#1A73E8]" : "text-[#797979]"}`} />
                <div>
                  <h4 className="text-xs font-semibold text-[#1F1F1F]">Communication Preferences</h4>
                  <p className="text-[11px] text-[#797979] mt-0.5">Choose where you want to receive job updates and notifications.</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveMenu("dnd")}
              className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                activeMenu === "dnd"
                  ? "bg-[#E8F4FF] border-[#1A73E8] shadow-xs"
                  : "bg-white border-[#DFEAF2] hover:bg-[#F8F9FA]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Moon className={`w-5 h-5 ${activeMenu === "dnd" ? "text-[#1A73E8]" : "text-[#797979]"}`} />
                <div>
                  <h4 className="text-xs font-semibold text-[#1F1F1F]">Do Not Disturb</h4>
                  <p className="text-[11px] text-[#797979] mt-0.5">Silence screening notifications for key focused hours.</p>
                </div>
              </div>
            </button>
          </div>

          {/* Right Form Panel (8 cols) */}
          <div className="col-span-8">
            <div className="bg-white border border-[#DFEAF2] rounded-xl p-6 shadow-[0_4px_4px_-2px_rgba(24,39,75,.08)] space-y-6">
              <div className="border-b border-[#DFEAF2] pb-3">
                <h3 className="text-base font-semibold text-[#1F1F1F]">Update Password</h3>
                <p className="text-xs text-[#797979]">Fields marked with * are required.</p>
              </div>

              <form onSubmit={handlePasswordUpdate} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-medium text-[#4C4C4C]">Current Password *</label>
                  <div className="relative">
                    <input
                      type={showCurrentPw ? "text" : "password"}
                      placeholder="Enter current password"
                      value={pwForm.currentPassword}
                      onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })}
                      className="w-full h-10 px-3 pr-10 bg-[#F8F9FA] border border-[#DFEAF2] rounded-md text-xs text-[#1F1F1F] focus:outline-none focus:border-[#1A73E8]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPw(!showCurrentPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#797979] hover:text-[#1F1F1F]"
                    >
                      {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-[#4C4C4C]">New Password *</label>
                  <div className="relative">
                    <input
                      type={showNewPw ? "text" : "password"}
                      placeholder="Enter new password"
                      value={pwForm.newPassword}
                      onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })}
                      className="w-full h-10 px-3 pr-10 bg-[#F8F9FA] border border-[#DFEAF2] rounded-md text-xs text-[#1F1F1F] focus:outline-none focus:border-[#1A73E8]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPw(!showNewPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#797979] hover:text-[#1F1F1F]"
                    >
                      {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-[#4C4C4C]">Confirm Password *</label>
                  <div className="relative">
                    <input
                      type={showConfirmPw ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={pwForm.confirmPassword}
                      onChange={(e) => setPwForm({ ...pwForm, confirmPassword: e.target.value })}
                      className="w-full h-10 px-3 pr-10 bg-[#F8F9FA] border border-[#DFEAF2] rounded-md text-xs text-[#1F1F1F] focus:outline-none focus:border-[#1A73E8]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPw(!showConfirmPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#797979] hover:text-[#1F1F1F]"
                    >
                      {showConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="h-11 px-6 bg-[#1A73E8] hover:bg-[#488FED] text-white text-xs font-semibold rounded-md shadow-xs transition-colors cursor-pointer"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 p-3 rounded-lg border shadow-lg bg-[#CCEFDC] border-[#00AE52] text-[#00AE52] text-xs font-medium flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
