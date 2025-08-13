import React, { useState } from 'react';

const Notifications = ({ notifications }) => {
  // Default notifications data if not provided
  const defaultNotifications = [
    {
      notif_id: 1,
      user_id: 1,
      message: "Your rent payment is due in 3 days",
      create_at: "2025-08-05",
      type: "bill_reminder"
    },
    {
      notif_id: 2,
      user_id: 1,
      message: "You're approaching your monthly budget limit",
      create_at: "2025-08-12",
      type: "budget_alert"
    },
    {
      notif_id: 3,
      user_id: 1,
      message: "New alternative found - Save $25/month on electricity",
      create_at: "2025-08-11",
      type: "alternative_suggestion"
    },
    {
      notif_id: 4,
      user_id: 1,
      message: "Internet bill payment processed successfully",
      create_at: "2025-08-10",
      type: "payment_confirmation"
    }
  ];

  const notificationsData = notifications || defaultNotifications;
  
  const [notificationSettings, setNotificationSettings] = useState({
    billReminders: true,
    budgetAlerts: true,
    savingTips: true,
    monthlyReports: false
  });

  const [readNotifications, setReadNotifications] = useState(new Set());

  // Helper function to get time ago
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  // Helper function to get notification config based on type
  const getNotificationConfig = (type) => {
    const configs = {
      bill_reminder: {
        title: 'Bill Reminder',
        icon: 'fas fa-clock',
        borderColor: 'border-l-blue-500',
        iconBg: 'bg-blue-100 text-blue-500',
        buttonText: 'View',
        buttonColor: 'bg-blue-500 hover:bg-blue-600'
      },
      budget_alert: {
        title: 'Budget Alert',
        icon: 'fas fa-exclamation-triangle',
        borderColor: 'border-l-yellow-500',
        iconBg: 'bg-yellow-100 text-yellow-500',
        buttonText: 'Review',
        buttonColor: 'bg-yellow-500 hover:bg-yellow-600'
      },
      alternative_suggestion: {
        title: 'Money Saving Tip',
        icon: 'fas fa-lightbulb',
        borderColor: 'border-l-green-500',
        iconBg: 'bg-green-100 text-green-500',
        buttonText: 'Explore',
        buttonColor: 'bg-green-500 hover:bg-green-600'
      },
      payment_confirmation: {
        title: 'Payment Confirmed',
        icon: 'fas fa-check-circle',
        borderColor: 'border-l-blue-500',
        iconBg: 'bg-blue-100 text-blue-500',
        buttonText: null,
        buttonColor: null
      }
    };
    return configs[type] || configs.bill_reminder;
  };

  const markAllAsRead = () => {
    const allIds = notificationsData.map(n => n.notif_id);
    setReadNotifications(new Set(allIds));
  };

  const markAsRead = (notifId) => {
    setReadNotifications(prev => new Set([...prev, notifId]));
  };

  const updateSetting = (setting, value) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: value }));
  };

  const savePreferences = () => {
    console.log('Saving notification preferences:', notificationSettings);
    alert('✅ Notification preferences saved!');
  };

  const unreadCount = notificationsData.filter(n => !readNotifications.has(n.notif_id)).length;

  const NotificationItem = ({ notification }) => {
    const config = getNotificationConfig(notification.type);
    const isRead = readNotifications.has(notification.notif_id);

    return (
      <div className={`bg-white p-4 mb-3 rounded-lg border-l-4 ${config.borderColor} ${isRead ? 'opacity-60' : ''} transition-opacity`}>
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${config.iconBg}`}>
            <i className={config.icon}></i>
          </div>
          <div className="flex-grow">
            <h6 className="font-medium mb-1">{config.title}</h6>
            <p className="mb-1 text-gray-600">{notification.message}</p>
            <small className="text-gray-500">{getTimeAgo(notification.create_at)}</small>
          </div>
          <div className="flex items-center space-x-2">
            {!isRead && (
              <button 
                onClick={() => markAsRead(notification.notif_id)}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Mark Read
              </button>
            )}
            {config.buttonText && (
              <button className={`text-white px-3 py-1 rounded text-sm ${config.buttonColor}`}>
                {config.buttonText}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-light text-gray-900">Notifications</h1>
        {unreadCount > 0 && (
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">
            {unreadCount} new
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h5 className="text-lg font-medium">Recent Notifications</h5>
              <button 
                onClick={markAllAsRead}
                className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors"
                disabled={unreadCount === 0}
              >
                Mark All Read
              </button>
            </div>
            
            <div>
              {notificationsData.length > 0 ? (
                notificationsData.map((notification) => (
                  <NotificationItem key={notification.notif_id} notification={notification} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <i className="fas fa-bell-slash text-4xl mb-4"></i>
                  <p>No notifications at this time</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h6 className="font-medium mb-4">Notification Settings</h6>
            
            <div className="space-y-4">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={notificationSettings.billReminders}
                  onChange={(e) => updateSetting('billReminders', e.target.checked)}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Bill payment reminders</span>
              </label>
              
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={notificationSettings.budgetAlerts}
                  onChange={(e) => updateSetting('budgetAlerts', e.target.checked)}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Budget limit alerts</span>
              </label>
              
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={notificationSettings.savingTips}
                  onChange={(e) => updateSetting('savingTips', e.target.checked)}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Money saving suggestions</span>
              </label>
              
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={notificationSettings.monthlyReports}
                  onChange={(e) => updateSetting('monthlyReports', e.target.checked)}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Monthly spending reports</span>
              </label>
            </div>
            
            <button 
              onClick={savePreferences}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-6 w-full transition-colors"
            >
              Save Preferences
            </button>
          </div>

          {/* Notification Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
            <h6 className="font-medium mb-4">📈 Notification Summary</h6>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Unread</span>
                <span className="font-medium text-red-500">{unreadCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">This Week</span>
                <span className="font-medium">{notificationsData.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bill Reminders</span>
                <span className="font-medium">
                  {notificationsData.filter(n => n.type === 'bill_reminder').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Budget Alerts</span>
                <span className="font-medium">
                  {notificationsData.filter(n => n.type === 'budget_alert').length}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
            <h6 className="font-medium mb-4">🕒 Recent Activity</h6>
            <div className="space-y-2">
              {notificationsData.slice(0, 3).map((notification) => {
                const config = getNotificationConfig(notification.type);
                return (
                  <div key={notification.notif_id} className="flex items-center py-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${config.iconBg} text-xs`}>
                      <i className={config.icon}></i>
                    </div>
                    <div className="flex-grow">
                      <div className="text-sm text-gray-900 truncate">{config.title}</div>
                      <div className="text-xs text-gray-500">{getTimeAgo(notification.create_at)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;