import {
  LayoutDashboard,
  BookOpen,
  Route,
  Settings
} from 'lucide-vue-next'

export const moduleMenu = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard
  },
  {
    id: 'training-management',
    label: 'Training Management',
    icon: BookOpen,
    subItems: [
      { id: 'company', label: 'Company' },
      { id: 'policies', label: 'Policies' },
      { id: 'procedures', label: 'Procedures' },
      { id: 'courses', label: 'Courses' }
    ]
  },
  {
    id: 'learning-paths',
    label: 'Learning Paths',
    icon: Route
  },
  {
    id: 'configurations',
    label: 'Configurations',
    icon: Settings,
    subItems: [
      { id: 'notifications', label: 'Notifications' },
      { id: 'automation', label: 'Automation' }
    ]
  }
]
