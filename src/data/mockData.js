export const mockData = {
  users: [
    {
      user_id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com"
    }
  ],
  bills: [
    {
      bill_id: 1,
      user_id: 1,
      name: "Rent",
      amount: 1850.00,
      category: "Housing",
      due_date: "2025-08-01",
      isExpensive: true,
      status: "pending"
    },
    {
      bill_id: 2,
      user_id: 1,
      name: "Electric Bill",
      amount: 125.50,
      category: "Utilities",
      due_date: "2025-08-15",
      isExpensive: false,
      status: "due_soon"
    },
    {
      bill_id: 3,
      user_id: 1,
      name: "Internet",
      amount: 79.99,
      category: "Utilities",
      due_date: "2025-08-10",
      isExpensive: false,
      status: "paid"
    }
  ],
  budget: {
    user_id: 1,
    monthly_limit: 3500.00,
    alert: true
  },
  notifications: [
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
      create_at: "2025-08-07",
      type: "budget_alert"
    },
    {
      notif_id: 3,
      user_id: 1,
      message: "New alternative found - Save $25/month on electricity",
      create_at: "2025-08-08",
      type: "alternative_suggestion"
    },
    {
      notif_id: 4,
      user_id: 1,
      message: "Internet bill payment processed successfully",
      create_at: "2025-08-04",
      type: "payment_confirmation"
    }
  ],
  alternatives: [
    {
      alternative_id: 1,
      bill_id: 2,
      alternative_name: "GreenPower Electric",
      est_saving: 25.00,
      link: "https://greenpower.com/switch"
    },
    {
      alternative_id: 2,
      bill_id: 3,
      alternative_name: "FastNet Fiber",
      est_saving: 15.00,
      link: "https://fastnet.com/deals"
    }
  ]
};