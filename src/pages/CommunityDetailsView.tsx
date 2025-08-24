import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, GoBack } from '../components';
import {
  CommunityBanner,
  CommunityPosts,
  CommunityMembers,
  CommunityRules,
  CreatePostModal,
  CreateCommunityModal
} from '../components/community';
import { useGetCommunityDetails } from '../services';
import { Tabs } from '../components/ui';
import {
  ExclamationTriangleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { useGoBack } from '../lib';
import { useQueryParams } from '../utils';

const CommunityDetailsView = () => {

  const goback = useGoBack()

  const { communityId } = useParams<{ communityId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('posts');
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isEditCommunityModalOpen, setIsEditCommunityModalOpen] = useState(false);

  const { resetQueryParams }  = useQueryParams()

  const { data: community, isLoading, error } = useGetCommunityDetails(communityId || '');

  const navItems = [
    { id: 'posts', name: 'Posts' },
    { id: 'members', name: 'Members' },
    { id: 'rules', name: 'Rules' },
  ];

  const handlePostSuccess = () => {
    setIsCreatePostModalOpen(false);
  };

  const handleEditCommunity = () => {
    setIsEditCommunityModalOpen(true);
  };

  const handleCommunitySuccess = () => {
    setIsEditCommunityModalOpen(false);
  };

  const handleViewPost = (postId: string) => {
    navigate(`posts/${postId}`);
  };


  const getActiveComponent = () => {
    if (!community) return null;

    switch (activeTab) {
      case 'posts':
        return (
          <CommunityPosts
            community={community}
            onViewPost={handleViewPost}
          />
        );
      case 'members':
        return <CommunityMembers communityId={community.id} />;
      case 'rules':
        return <CommunityRules community={community} />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Container>
          <div className="py-8">
            <div className="animate-pulse">
              <div className="h-48 md:h-64 bg-gray-200 rounded-t-xl"></div>
              <div className="bg-white rounded-b-xl p-6 -mt-16 relative z-10">
                <div className="flex items-end space-x-4 mb-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="flex space-x-4">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (error || !community) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Container>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Community Not Found</h2>
            <p className="text-gray-600 mb-4">
              The community you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={goback}
              className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 text-sm">
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Back to Communities</span>
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-8 p-2 md:p-4">

      <GoBack label='Back to Communities' />

      {/* Community Banner */}
      <CommunityBanner
        community={community}
        onEdit={handleEditCommunity}
        onManageMembers={() => setActiveTab('members')}
      />

      {/* Tabs */}
      <Tabs items={navItems} 
        initialActive={activeTab}
        className='!text-[13px]'
        onTabChange={(id: string | number) => {
          resetQueryParams()
          setActiveTab(id as string)
        }} />

      {/* Tab Content */}
      <div className="bg-white rounded-xl p-4 sm:p-6">
        {getActiveComponent()}
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        onSuccess={handlePostSuccess}
        community={community}
      />

      {/* Edit Community Modal */}
      <CreateCommunityModal
        isOpen={isEditCommunityModalOpen}
        onClose={() => setIsEditCommunityModalOpen(false)}
        onSuccess={handleCommunitySuccess}
        community={community}
      />

    </div>
  );
};

export default CommunityDetailsView;
