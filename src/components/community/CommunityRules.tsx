import React from 'react';
import { CommunityType } from '../../types';
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface CommunityRulesProps {
  community: CommunityType;
}

const CommunityRules: React.FC<CommunityRulesProps> = ({ community }) => {
  const defaultRules = [
    'Be respectful and kind to all members',
    'No spam, self-promotion, or advertising without permission',
    'Stay on topic and relevant to the community',
    'No harassment, bullying, or hate speech',
    'Respect privacy and do not share personal information',
    'Follow the community guidelines and terms of service'
  ];

  const rules = community.rules && community.rules.length > 0
    ? community.rules.filter(rule => rule.trim() !== '')
    : defaultRules;

  return (
    <div className="space-y-3">

      <div className="flex items-center space-x-2 pb-5">
        <ExclamationTriangleIcon className="size-5 text-primary" />
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Community Rules</h3>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
        <div className="flex items-start space-x-3">
          <InformationCircleIcon className="size-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1 text-sm ">Community Guidelines</h4>
            <p className="text-blue-700 text-[13px] leading-relaxed">
              These rules help maintain a positive and productive environment for all members.
              Please read and follow them to ensure everyone has a great experience.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2.5">
        <div className="flex items-start space-x-3">
          <ExclamationTriangleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-yellow-900 mb-1 text-sm">Important Reminder</h4>
            <p className="text-yellow-700 text-xs leading-relaxed">
              Violation of these rules may result in warnings, temporary suspension, or removal from the community.
              If you see someone breaking the rules, please report it to the community moderators.
            </p>
          </div>
        </div>
      </div>

      {community.is_private && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-2.5">
          <div className="flex items-start space-x-3">
            <InformationCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-purple-900 mb-1 text-sm">Private Community</h4>
              <p className="text-purple-700 text-xs leading-relaxed">
                This is a private community. Content and discussions should remain within the community
                and not be shared outside without permission from the community admin.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2 pt-6">
        {rules.map((rule, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <CheckCircleIcon className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700 text-xs sm:text-[13px] leading-relaxed">
              {rule}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
};

export default CommunityRules;
