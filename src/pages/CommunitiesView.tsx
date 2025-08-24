import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Pagination } from '../components';
import { CommunityCard, CreateCommunityModal } from '../components/community';
import { useGetCommunities, useGetMyCommunities } from '../services';
import { CommunityType } from '../types';
import { Button } from '../components/ui';
import { UserGroupIcon, FunnelIcon } from '@heroicons/react/24/outline';
import SearchBar from '../components/SearchBar';
import { RootState } from '../redux/store';
import { useQueryParams } from '../utils';

const COMMUNITY_CATEGORIES = [
  'All Categories',
  'Technology',
  'Business',
  'Education',
  'Health & Wellness',
  'Arts & Culture',
  'Sports',
  'Science',
  'Finance',
  'Marketing',
  'Design',
  'Programming',
  'Leadership',
  'Career Development',
  'Personal Growth',
  'Other'
];

const CommunitiesView = () => {

  const navigate = useNavigate();
  const { role } = useSelector((state: RootState) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [viewMode, setViewMode] = useState<'all' | 'my'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { searchParams } = useQueryParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("perPage")) || 10;

  const { data: communitiesData, isLoading: isLoadingAll } = useGetCommunities(
    page,
    limit,
    searchQuery,
    selectedCategory === 'All Categories' ? '' : selectedCategory
  );

  const { data: myCommunitiesData, isLoading: isLoadingMy } = useGetMyCommunities();

  const communities = viewMode === 'all'
    ? communitiesData?.data || []
    : myCommunitiesData?.data || [];

  const totalCommunities = communitiesData?.meta?.total || 0;
  const isLoading = viewMode === 'all' ? isLoadingAll : isLoadingMy;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCreateCommunity = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false);
  };

  const isMentor = role === 'mentor';

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="py-2 sm:p-4 lg:p-6">

        {/* Header */}
        <div className="mb-6 sm:mb-8">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

            <div className="flex-1">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                Communities
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm">
                Discover and join communities of mentors and mentees
              </p>
            </div>

            {/* Create Community Button - Only for Mentors */}
            {isMentor && (
              <Button onPress={handleCreateCommunity} className="flex items-center space-x-2 w-full sm:w-auto rounded-lg text-xs" size="sm">
                <UserGroupIcon className="w-5 h-5" />
                <span>Create Community</span>
              </Button>
            )}

          </div>

          {/* View Mode Tabs */}
          <div className="flex items-center space-x-1 bg-white rounded-lg p-1 border border-gray-200 w-fit">
            <button
              onClick={() => setViewMode('all')}
              className={`px-3 sm:px-4 py-2 rounded-md !text-[12px] font-medium transition-colors ${viewMode === 'all'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:text-gray-900'
                }`} >
              All Communities
            </button>
            <button
              onClick={() => setViewMode('my')}
              className={`px-3 sm:px-4 py-2 rounded-md !text-[12px] font-medium transition-colors ${viewMode === 'my'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              My Communities
            </button>
          </div>

        </div>

        {/* Mobile Filter Toggle */}
        <div className="sm:hidden mb-4">
          <Button
            variant="bordered"
            onPress={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center space-x-2"
          >
            <FunnelIcon className="w-4 h-4" />
            <span>Filters</span>
          </Button>
        </div>

        {/* Filters */}
        {viewMode === 'all' && (
          <div className={`bg-white rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 ${showFilters ? 'block' : 'hidden sm:block'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-end">
              <div className="relative">
                <SearchBar
                  placeholder="Search communities..."
                  onSearch={handleSearch}
                  className="w-full"
                />
              </div>
              <div className="form-group">
                <label className="form-label text-xs mb-1">Category</label>
                <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)} className="form-control w-full">
                  {COMMUNITY_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        {viewMode === 'all' && (
          <div className="bg-white rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <UserGroupIcon className="w-5 h-5 text-primary" />
                <span className="text-sm text-gray-600">
                  {totalCommunities} communities found
                </span>
              </div>
              {selectedCategory !== 'All Categories' && (
                <span className="text-sm text-gray-500">
                  Filtered by: {selectedCategory}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Communities Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 animate-pulse">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : communities.length === 0 ? (
          <div className="flex items-center justify-center flex-col text-center py-12 sm:py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserGroupIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-base font-medium text-gray-900 mb-2">
              {viewMode === 'all' ? 'No communities found' : 'You haven\'t joined any communities yet'}
            </h3>
            <p className="text-gray-500 mb-4 max-w-md mx-auto text-sm">
              {viewMode === 'all'
                ? 'Try adjusting your search or filters to find communities.'
                : 'Join communities to connect with mentors and mentees.'
              }
            </p>
            {viewMode === 'my' && (
              <Button className='rounded-xl' onPress={() => setViewMode('all')}>
                Browse All Communities
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-3">
              {communities.map((community: CommunityType) => (
                <CommunityCard
                  key={community.id}
                  community={community}
                  onViewDetails={(communityId: string) => {
                    navigate(`${communityId}`);
                  }}
                />
              ))}
            </div>

            {/* Pagination */}
            {viewMode === 'all' && totalCommunities > 1 && (
                <Pagination className="mt-10" perPage={limit} total={totalCommunities || 0} />
              )}
          </>
        )}
      </div>

      {/* Create Community Modal */}
      <CreateCommunityModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />

    </div>
  );
};

export default CommunitiesView;
