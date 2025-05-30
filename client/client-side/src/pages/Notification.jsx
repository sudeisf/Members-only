import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "../store/notificationStore";
import { Check, CheckCircle, X } from "lucide-react";

export const Notifications = () => {
  const {
    notifications,
    isLoading,
    getNotifications,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  } = useNotificationStore();
  const navigate = useNavigate();

  // Log for debugging
  console.log("Notifications page rendered, notifications:", notifications);

  // Fetch notifications when page mounts
  useEffect(() => {
    console.log("Fetching notifications");
    getNotifications();
  }, [getNotifications]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 className="font-semibold text-lg">Notifications</h3>
          <div className="flex gap-2">
            <button
              onClick={markAllAsRead}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Mark all as read"
              aria-label="Mark all notifications as read"
            >
              <CheckCircle className="w-5 h-5" />
            </button>
            <button
              onClick={clearNotifications}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Clear all"
              aria-label="Clear all notifications"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate(-1)} // Go back to previous page
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Close notifications"
              aria-label="Close notifications page"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="p-4 text-center text-gray-500">Loading...</div>
        )}

        {/* Empty state */}
        {!isLoading && notifications.length === 0 && (
          <div className="p-4 text-center text-gray-500">No notifications</div>
        )}

        {/* Notifications list */}
        <div className="overflow-y-auto max-h-[80vh] flex-1">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b dark:border-gray-700 flex items-start gap-3 ${
                notification.is_read
                  ? "bg-gray-50 dark:bg-gray-700/50"
                  : "bg-white dark:bg-gray-800"
              }`}
            >
              <div className="flex-1">
                <p className="font-medium">{notification.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(notification.created_at).toLocaleString()}
                </p>
              </div>
              {!notification.is_read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                  title="Mark as read"
                  aria-label={`Mark notification ${notification.id} as read`}
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};