import './globals.css';
import Sidebar from '@/components/sidebar';

export const metadata = {
  title: 'Next.js Admin CRUD',
  description: 'Styled with Shadcn Starter Aesthetics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased flex bg-slate-50 min-h-screen">
        {/* Persistent Side Navigation */}
        <Sidebar />

        {/* Core Screen Application Container */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Main Top Header Bar */}
          <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-sm">Workspace</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-700 font-medium text-sm">Tasks CRUD</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700">Administrator</span>
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                AD
              </div>
            </div>
          </header>

          {/* Scrollable Context Box */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}