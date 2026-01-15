'use client';

import React, { useMemo, useCallback, useState } from 'react';
import { ChevronDown, Plus, Pencil } from 'lucide-react';
import Checkbox from '@/common/ui/Checkbox';
import { AddTravelerModal } from '@/app/(pages)/profile/components';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { TravelerDetailsProps, ExistingTraveler, ExistingTravelersResponse } from '../types';
import { EditOwnerModal } from './EditOwnerModal';
import usePostData from '@/services/usePostData';
import { notify } from '@/common/utils/notify';

const TravelerDetails: React.FC<TravelerDetailsProps> = ({
    selectedTravelerIds,
    onSelectedTravelersChange,
    onNext,
}) => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(true);
    const [isTravelerModalOpen, setIsTravelerModalOpen] = useState(false);
    const [editingTraveler, setEditingTraveler] = useState<ExistingTraveler | null>(null);
    const [isEditOwnerModalOpen, setIsEditOwnerModalOpen] = useState(false);
    const ownerInitialized = React.useRef(false);

    const { mutate: updateProfile, isPending: isUpdatingProfile } = usePostData({
        url: API_ENDPOINTS.USER.UPDATE,
    });

    const { data: travelersResponse, refetch: refetchTravelers } = useGetData<ExistingTravelersResponse>(
        `${API_ENDPOINTS.GUEST_USERS.GET}?location=booking`
    );

    const owner = useMemo(() => travelersResponse?.owner, [travelersResponse]);
    const guestTravelers = useMemo(() => travelersResponse?.guestUsers || [], [travelersResponse]);

    // Auto-select owner on mount
    React.useEffect(() => {
        if (owner && owner._id && !ownerInitialized.current) {
            ownerInitialized.current = true;
            if (!selectedTravelerIds.includes(owner._id)) {
                onSelectedTravelersChange([...selectedTravelerIds, owner._id]);
            }
        }
    }, [owner, selectedTravelerIds, onSelectedTravelersChange]);

    const handleTravelerSelect = useCallback((travelerId: string, isSelected: boolean) => {
        if (isSelected) {
            onSelectedTravelersChange([...selectedTravelerIds, travelerId]);
        } else {
            onSelectedTravelersChange(selectedTravelerIds.filter(id => id !== travelerId));
        }
    }, [selectedTravelerIds, onSelectedTravelersChange]);

    const handleAddTraveler = useCallback(() => {
        setEditingTraveler(null);
        setIsTravelerModalOpen(true);
    }, []);

    const handleEditTraveler = useCallback((traveler: ExistingTraveler) => {
        setEditingTraveler(traveler);
        setIsTravelerModalOpen(true);
    }, []);

    const handleEditOwner = useCallback(() => {
        setIsEditOwnerModalOpen(true);
    }, []);

    const handleSaveOwnerDetails = useCallback((data: Partial<ExistingTraveler>) => {
        const updatePayload = {
            fullName: data.fullName,
            mobileNumber: data.phone,
            governmentIdType: data.governmentIdType,
            governmentIdNumber: data.governmentIdNumber,
        };

        updateProfile(updatePayload, {
            onSuccess: () => {
                notify.success('Profile updated successfully!');
                void refetchTravelers();
            },
            onError: () => {
                notify.error('Failed to update profile. Please try again.');
            },
        });
    }, [updateProfile, refetchTravelers]);

    const handleCloseOwnerModal = useCallback(() => {
        setIsEditOwnerModalOpen(false);
    }, []);

    const handleCloseTravelerModal = useCallback(() => {
        setIsTravelerModalOpen(false);
        setEditingTraveler(null);
        void refetchTravelers();
    }, [refetchTravelers]);

    const totalSelectedTravelers = selectedTravelerIds.length;

    const isOwnerComplete = useMemo(() => {
        return owner &&
               owner.fullName?.trim() &&
               owner.phone?.trim() &&
               owner.governmentIdType?.trim() &&
               owner.governmentIdNumber?.trim();
    }, [owner]);

    const isFormValid = useMemo(() => {
        return selectedTravelerIds.length > 0 && isOwnerComplete;
    }, [selectedTravelerIds, isOwnerComplete]);

    const handleNext = useCallback(() => {
        if (isFormValid) {
            onNext();
        }
    }, [isFormValid, onNext]);

    return (
        <div className="flex flex-col">
            <div className="pb-5">
                <p className="text-[#404040] text-[14px] font-medium font-['Satoshi'] leading-[21px]">
                    Select travelers from your saved list or add new travelers
                </p>
            </div>

            <div className="py-5 flex flex-col gap-3 border-t border-[#EDEDED]">
                <h3 className="text-[#121212] text-[15px] font-bold font-['Satoshi'] leading-[22.5px]">
                    Number of travelers
                </h3>
                <div className="flex items-center">
                    <div className="flex flex-col">
                        <span className="text-[#121212] text-2xl font-bold font-['Satoshi'] leading-9">
                            {totalSelectedTravelers}
                        </span>
                        <span className="text-[#404040] text-[14px] font-medium font-['Satoshi'] leading-[21px]">
                            {totalSelectedTravelers === 1 ? 'Traveler selected' : 'Travelers selected'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="pt-5 border-t border-[#EDEDED]">
                <div
                    className="flex justify-between items-center py-4 cursor-pointer"
                    onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                >
                    <h3 className="text-[#121212] text-[15px] font-bold font-['Satoshi'] leading-[22.5px]">
                        Select travelers
                    </h3>
                    <ChevronDown
                        className={`w-5 h-5 text-[#121212] transition-transform ${
                            isAccordionOpen ? 'rotate-180' : ''
                        }`}
                        strokeWidth={2}
                    />
                </div>

                {isAccordionOpen && (
                    <div className="flex flex-col gap-3 pb-4">
                        {owner && (
                            <div className="flex items-start gap-3 p-4 bg-[#F9F9F9] rounded-xl border border-[#EDEDED]">
                                <Checkbox
                                    id={`traveler-${owner._id}`}
                                    checked={selectedTravelerIds.includes(owner._id)}
                                    onChange={(checked) => handleTravelerSelect(owner._id, checked)}
                                />
                                <div className="flex-1 flex flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#121212] text-[15px] font-bold font-['Satoshi'] leading-[22.5px]">
                                            {owner.fullName} (you)
                                        </span>
                                        <button
                                            onClick={handleEditOwner}
                                            className="p-2 hover:bg-[#EDEDED] rounded-lg transition-colors"
                                            aria-label="Edit your details"
                                        >
                                            <Pencil className="w-4 h-4 text-[#404040]" strokeWidth={2} />
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-[#404040] text-[13px] font-medium font-['Satoshi'] leading-[19.5px]">
                                            {owner.email}
                                        </span>
                                        <span className="text-[#404040] text-[13px] font-medium font-['Satoshi'] leading-[19.5px]">
                                            {owner.phone || 'Mobile number not provided'}
                                        </span>
                                        {(!isOwnerComplete) && (
                                            <span className="text-red-600 text-[12px] font-medium font-['Satoshi'] leading-[18px] mt-1">
                                                Complete your details to proceed
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {guestTravelers.length > 0 ? (
                            guestTravelers.map((traveler) => (
                                <div
                                    key={traveler._id}
                                    className="flex items-start gap-3 p-4 bg-[#F9F9F9] rounded-xl border border-[#EDEDED]"
                                >
                                    <Checkbox
                                        id={`traveler-${traveler._id}`}
                                        checked={selectedTravelerIds.includes(traveler._id)}
                                        onChange={(checked) => handleTravelerSelect(traveler._id, checked)}
                                    />
                                    <div className="flex-1 flex flex-col gap-1">
                                        <span className="text-[#121212] text-[15px] font-bold font-['Satoshi'] leading-[22.5px]">
                                            {traveler.fullName}
                                        </span>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[#404040] text-[13px] font-medium font-['Satoshi'] leading-[19.5px]">
                                                {traveler.email}
                                            </span>
                                            <span className="text-[#404040] text-[13px] font-medium font-['Satoshi'] leading-[19.5px]">
                                                {traveler.phone}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleEditTraveler(traveler)}
                                        className="p-2 hover:bg-[#EDEDED] rounded-lg transition-colors"
                                        aria-label="Edit traveler"
                                    >
                                        <Pencil className="w-4 h-4 text-[#404040]" strokeWidth={2} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            !owner && (
                                <div className="flex flex-col items-center justify-center py-8 gap-3">
                                    <p className="text-[#404040] text-[14px] font-medium font-['Satoshi'] text-center">
                                        No saved travelers found. Add travelers to get started.
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
            <div className="pt-5">
                <button
                    onClick={handleAddTraveler}
                    className="w-full py-4 rounded-xl border-2 border-[#121212] text-[#121212] text-[16px] font-bold font-['Satoshi'] leading-6 transition-colors hover:bg-[#121212] hover:text-white flex items-center justify-center gap-2"
                >
                    <Plus className="w-5 h-5" strokeWidth={2} />
                    Add New Traveler
                </button>
            </div>
            <div className="pt-6">
                <button
                    onClick={handleNext}
                    disabled={!isFormValid}
                    className={`w-full py-4 rounded-xl text-white text-[16px] font-bold font-['Satoshi'] leading-6 transition-colors ${
                        isFormValid
                            ? 'bg-[#121212] hover:bg-[#2a2a2a] cursor-pointer'
                            : 'bg-neutral-400 cursor-not-allowed opacity-50'
                    }`}
                >
                    Next
                </button>
            </div>
            <AddTravelerModal
                open={isTravelerModalOpen}
                onClose={handleCloseTravelerModal}
                existingTraveler={editingTraveler}
            />
            {owner && (
                <EditOwnerModal
                    open={isEditOwnerModalOpen}
                    onClose={handleCloseOwnerModal}
                    owner={owner}
                    onSave={handleSaveOwnerDetails}
                    isLoading={isUpdatingProfile}
                />
            )}
        </div>
    );
};

export default TravelerDetails;