import React, { useState } from 'react';
import { PlusCircle, Briefcase, Calendar, Building2, Mail, Phone, MapPin } from 'lucide-react';

interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: 'applied' | 'interviewing' | 'offered' | 'rejected';
  dateApplied: string;
  location: string;
  contactEmail?: string;
  contactPhone?: string;
  notes?: string;
}

function App() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newApplication, setNewApplication] = useState<Partial<JobApplication>>({
    status: 'applied',
    dateApplied: new Date().toISOString().split('T')[0]
  });

  const addApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApplication.company || !newApplication.position) return;

    setApplications([
      ...applications,
      {
        ...newApplication as JobApplication,
        id: crypto.randomUUID(),
      }
    ]);
    setIsModalOpen(false);
    setNewApplication({
      status: 'applied',
      dateApplied: new Date().toISOString().split('T')[0]
    });
  };

  const statusColors = {
    applied: 'bg-blue-100 text-blue-800',
    interviewing: 'bg-yellow-100 text-yellow-800',
    offered: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Briefcase className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Job Tracker</h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Application
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {applications.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No applications</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a new job application.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {applications.map((app) => (
              <div key={app.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 truncate">{app.position}</h3>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <Building2 className="flex-shrink-0 mr-1.5 h-4 w-4" />
                        {app.company}
                      </div>
                    </div>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[app.status]}`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4" />
                      Applied: {new Date(app.dateApplied).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4" />
                      {app.location}
                    </div>
                    {app.contactEmail && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="flex-shrink-0 mr-1.5 h-4 w-4" />
                        {app.contactEmail}
                      </div>
                    )}
                    {app.contactPhone && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="flex-shrink-0 mr-1.5 h-4 w-4" />
                        {app.contactPhone}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <form onSubmit={addApplication}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                    <input
                      type="text"
                      id="company"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={newApplication.company || ''}
                      onChange={(e) => setNewApplication({...newApplication, company: e.target.value})}
                    />
                  </div>
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position</label>
                    <input
                      type="text"
                      id="position"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={newApplication.position || ''}
                      onChange={(e) => setNewApplication({...newApplication, position: e.target.value})}
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      id="location"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={newApplication.location || ''}
                      onChange={(e) => setNewApplication({...newApplication, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      id="status"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={newApplication.status}
                      onChange={(e) => setNewApplication({...newApplication, status: e.target.value as JobApplication['status']})}
                    >
                      <option value="applied">Applied</option>
                      <option value="interviewing">Interviewing</option>
                      <option value="offered">Offered</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">Contact Email</label>
                    <input
                      type="email"
                      id="contactEmail"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={newApplication.contactEmail || ''}
                      onChange={(e) => setNewApplication({...newApplication, contactEmail: e.target.value})}
                    />
                  </div>
                  <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">Contact Phone</label>
                    <input
                      type="tel"
                      id="contactPhone"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={newApplication.contactPhone || ''}
                      onChange={(e) => setNewApplication({...newApplication, contactPhone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea
                      id="notes"
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={newApplication.notes || ''}
                      onChange={(e) => setNewApplication({...newApplication, notes: e.target.value})}
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  >
                    Add Application
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;