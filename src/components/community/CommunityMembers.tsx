import React from 'react';
import { CommunityMemberType } from '../../types';
import { useGetCommunityMembers } from '../../services';
import {
  UserGroupIcon,
  ShieldCheckIcon,
  UserIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';
import { useQueryParams } from '../../utils';
import Pagination from '../Pagination';

interface CommunityMembersProps {
  communityId: string;
}

const CommunityMembers: React.FC<CommunityMembersProps> = ({ communityId }) => {

  const { searchParams } = useQueryParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("perPage")) || 20;

  const { data: membersData, isLoading } = useGetCommunityMembers(
    communityId,
    page,
    limit
  );

  const members = membersData?.data || [];
  const totalMembers = membersData?.meta?.total || 0;


  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center space-x-2 mb-4 sm:mb-6">
          <UserGroupIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Members</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3 sm:p-4 animate-pulse">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-2 sm:h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <UserGroupIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Members</h3>
        </div>
        <span className="text-xs sm:text-sm text-gray-500">
          {totalMembers} member{totalMembers !== 1 ? 's' : ''}
        </span>
      </div>

      {members.length === 0 ? (
        <div className="text-center py-6 sm:py-8">
          <UserGroupIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
          <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No members yet</h4>
          <p className="text-sm sm:text-base text-gray-500">
            This community doesn't have any members yet.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {members.map((member: CommunityMemberType) => (

              <div key={member.id} className="bg-gray-50 rounded-lg p-3 sm:p-4 hover:bg-gray-100 transition-colors duration-200">

                <div className="flex items-start space-x-3">

                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center flex-shrink-0">
                    {member.avatar ? (
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-semibold text-xs sm:text-sm">
                        {member.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">

                    <div className="flex items-center space-x-2 mb-1">

                      <h4 className="font-medium text-gray-900 text-xs sm:text-sm truncate">
                        {member.name}
                      </h4>

                      {member.is_admin && (
                        <ShieldCheckIcon className="size-4 text-primary flex-shrink-0" title="Admin" />
                      )}
                      {member.is_moderator && (
                        <UserIcon className="size-4 text-blue-500 flex-shrink-0" title="Moderator" />
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs w-fit">
                        {member.role}
                      </span>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <CalendarIcon className="w-3 h-3" />
                        <span>
                          Joined {formatDistanceToNow(new Date(member.joined_at), { addSuffix: true })}
                        </span>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            ))}
          </div>

          <Pagination
            initialPage={page}
            total={totalMembers}
            perPage={limit}
            className='mt-10'
          />

        </>
      )}
    </div>
  );
};

export default CommunityMembers;
