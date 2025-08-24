import React from 'react';
import { CommunityType } from '../../types';
import { 
  ChartBarIcon,
  ArrowTrendingUpIcon ,
  UserGroupIcon,
  DocumentTextIcon,
  HeartIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

interface CommunityStatsProps {
  community: CommunityType;
}

const CommunityStats: React.FC<CommunityStatsProps> = ({ community }) => {
  const detailedStats = [
    {
      title: 'Engagement Rate',
      value: '85%',
      change: '+12%',
      isPositive: true,
      icon: ArrowTrendingUpIcon ,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Members',
      value: community?.member_count || 0,
      change: '+5',
      isPositive: true,
      icon: UserGroupIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Monthly Posts',
      value: community.post_count || 0,
      change: '+8',
      isPositive: true,
      icon: DocumentTextIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Total Views',
      value: 1 || 0,
      change: '+15%',
      isPositive: true,
      icon: EyeIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const activityMetrics = [
    {
      label: 'Posts This Week',
      value: Math.floor((community.post_count || 0) * 0.3),
      icon: DocumentTextIcon,
      color: 'text-blue-500'
    },
    {
      label: 'New Members',
      value: Math.floor((community.member_count || 0) * 0.1),
      icon: UserGroupIcon,
      color: 'text-green-500'
    },
    {
      label: 'Total Likes',
      value: 1 || 0,
      icon: HeartIcon,
      color: 'text-red-500'
    },
    {
      label: 'Comments',
      value: Math.floor((community.post_count || 0) * 2.5),
      icon: ChatBubbleLeftRightIcon,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center space-x-2">
        <ChartBarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Community Statistics</h3>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {detailedStats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} rounded-lg p-3 sm:p-4 border border-gray-100 hover:shadow-sm transition-shadow duration-200`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`${stat.color} p-1.5 sm:p-2 rounded-lg bg-white`}>
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className={`text-xs font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">
                {stat.title}
              </p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">
                {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Metrics */}
      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
        <div className="flex items-center space-x-2 mb-3 sm:mb-4">
          <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          <h4 className="font-medium text-gray-900 text-sm sm:text-base">Activity Metrics</h4>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {activityMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className={`${metric.color} mx-auto mb-2 p-2 rounded-lg bg-white w-fit`}>
                <metric.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <p className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                {metric.value.toLocaleString()}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Chart Placeholder */}
      <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h4 className="font-medium text-gray-900 text-sm sm:text-base">Growth Trend</h4>
          <div className="flex space-x-2">
            <button className="px-2 py-1 text-xs bg-primary text-white rounded-md">
              Week
            </button>
            <button className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-md">
              Month
            </button>
            <button className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-md">
              Year
            </button>
          </div>
        </div>
        <div className="h-32 sm:h-40 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <ChartBarIcon className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-xs sm:text-sm text-gray-500">Growth chart will be displayed here</p>
          </div>
        </div>
      </div>

      {/* Community Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">Top Performing Content</h4>
          <p className="text-blue-700 text-xs sm:text-sm">
            Posts with images and videos receive 3x more engagement than text-only posts.
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-200">
          <h4 className="font-medium text-green-900 mb-2 text-sm sm:text-base">Member Growth</h4>
          <p className="text-green-700 text-xs sm:text-sm">
            Community has grown by 25% in the last 30 days with high engagement rates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityStats;
