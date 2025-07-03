import Image from "next/image";
import { Loader2, Sparkles, Shield } from "lucide-react";
import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-sky-100 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-950">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-slate-200/50 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-slate-300/30 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-96 w-96 rounded-full bg-gradient-to-r from-slate-200/20 to-slate-300/20 blur-3xl"></div>
        </div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-2 sm:p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-8">
            <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <div className="relative">
                <Image
                  src="/logo.svg"
                  height={36}
                  width={36}
                  alt="Logo"
                  className="drop-shadow-sm"
                />
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 text-blue-500 animate-pulse" />
              </div>
              <h1 className="text-xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-400">
                FinanceTracker
              </h1>
            </div>
            <h2 className="text-lg sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-1 sm:mb-2">
              Welcome back
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Sign in to your account to continue managing your finances
            </p>
          </div>

          {/* Auth Card */}
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-2 sm:p-8">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                <Shield className="h-4 w-4" />
                <span>Secure Authentication</span>
              </div>
            </div>

            <ClerkLoaded>
              <SignIn
                path="/sign-in"
                appearance={{
                  elements: {
                    formButtonPrimary:
                      "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg font-medium",
                    card: "bg-transparent shadow-none p-0",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton:
                      "bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm rounded-lg",
                    formFieldInput:
                      "bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg",
                    footerActionLink:
                      "text-blue-600 hover:text-blue-700 font-medium",
                    dividerLine: "bg-slate-200",
                    dividerText: "text-slate-500 text-sm",
                  },
                }}
              />
            </ClerkLoaded>
            <ClerkLoading>
              <div className="flex flex-col items-center justify-center space-y-4 py-8">
                <div className="relative">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  <div className="absolute inset-0 rounded-full border-2 border-blue-200 animate-ping"></div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Loading authentication...
                </p>
              </div>
            </ClerkLoading>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-sm text-slate-500 dark:text-slate-400">
            <p>
              By continuing, you agree to our{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
