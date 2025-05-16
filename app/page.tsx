import { ChatInterface } from "@/components/chat-interface"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-amber-50">
      <div className="w-full max-w-4xl mx-auto flex flex-col h-screen">
        <header className="flex items-center justify-center py-6">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-amber-600 flex items-center justify-center">
              <span className="text-white text-xl">🍪</span>
            </div>
            <h1 className="text-2xl font-bold text-amber-800">Sweet Cookie</h1>
          </div>
        </header>

        <ChatInterface />

        <footer className="py-4 text-center text-amber-700 text-sm">
          © {new Date().getFullYear()} Sweet Cookie. All rights reserved.
        </footer>
      </div>
    </main>
  )
}
