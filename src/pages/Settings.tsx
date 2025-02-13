export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-12">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-800">
              Settings
            </h1>
            <p className="mt-2 text-gray-600 text-sm md:text-base">
              Manage your account preferences and configurations
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Settings content can be added here */}
          </div>
        </div>
      </div>
    </div>
  );
}
