import React, { useState, useEffect } from 'react';

export default function NotificationBell({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Poll for new notifications every 30 seconds (or just on load)
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Auto-refresh
    return () => clearInterval(interval);
  }, [userId]);

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/notifications/${userId}`);
      const data = await res.json();
      setNotifications(data);
      // Count how many are NOT read
      setUnreadCount(data.filter(n => !n.read).length);
    } catch (err) {
      console.error(err);
    }
  };

  const markRead = async (id) => {
    await fetch(`http://localhost:8080/api/notifications/read/${id}`, { method: 'POST' });
    // Update UI locally to remove the "unread" dot
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const createTestAlert = async () => {
    await fetch(`http://localhost:8080/api/notifications/test/${userId}`, { method: 'POST' });
    fetchNotifications(); // Refresh list
  };

  return (
    <div className="relative z-50">
      {/* BELL ICON */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="relative p-2 text-slate-400 hover:text-white transition"
      >
        <span className="text-2xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-3 border-b border-slate-700 flex justify-between items-center bg-slate-900/50">
            <h3 className="font-bold text-white text-sm">Notifications</h3>
            <button onClick={createTestAlert} className="text-xs text-blue-400 hover:underline">
              + Test Alert
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-slate-500 text-center py-6 text-sm">No new notifications</p>
            ) : (
              notifications.map((n) => (
                <div 
                  key={n.id} 
                  onClick={() => markRead(n.id)}
                  className={`p-3 border-b border-slate-700/50 hover:bg-slate-700/50 cursor-pointer transition ${
                    !n.read ? 'bg-blue-500/5' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <span className="text-lg">
                      {n.type === 'DANGER' ? '🔴' : n.type === 'WARNING' ? '⚠️' : '🔵'}
                    </span>
                    <div>
                      <p className={`text-sm ${!n.read ? 'text-white font-semibold' : 'text-slate-400'}`}>
                        {n.message}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1">
                        {new Date(n.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}