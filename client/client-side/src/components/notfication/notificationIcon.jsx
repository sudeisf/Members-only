import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "../../store/notificationStore";
import { Bell, BellDot } from "lucide-react";

export const NotificationIcon = () => {
  const getNotificationCount = useNotificationStore((state) => state.getNotificationCount);

  const unreadCount = getNotificationCount();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate("/protected/notifications");
      }}
      className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      aria-label={`Notifications (${unreadCount} unread)`}
    >
      {unreadCount > 0 ? (
        <>
          <BellDot className="w-6 h-6 text-rose-500" />
          <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        </>
      ) : (
        <Bell className="w-6 h-6" />
      )}
    </button>
  );
};