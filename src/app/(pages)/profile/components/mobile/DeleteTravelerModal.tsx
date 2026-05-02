import React from 'react'
import Modal from '@/common/ui/Modal'
import Button from '@/common/components/atoms/Button'

interface TravelerDetail {
  _id?: string
  fullName: string
  email: string
  phone: string
  governmentIdType?: string
  governmentIdNumber?: string
}

interface DeleteTravelerModalProps {
  open: boolean
  onClose: () => void
  traveler: TravelerDetail | null
  isDeletingGuestUser: boolean
  onConfirmDelete: () => void
}

const DeleteTravelerModal: React.FC<DeleteTravelerModalProps> = ({
  open,
  onClose,
  traveler,
  isDeletingGuestUser,
  onConfirmDelete,
}) => {
  return (
    <Modal
      title="Delete Traveler"
      open={open}
      onClose={onClose}
      showButtons={false}
    >
      <div className="flex flex-col gap-4">
        <p className="text-neutral-700">
          Are you sure you want to delete{' '}
          <span className="font-semibold">{traveler?.fullName}</span>? This
          action cannot be undone.
        </p>
        <div className="flex gap-3 mt-4">
          <Button
            variant="outlined"
            onClick={onClose}
            className="flex-1"
            disabled={isDeletingGuestUser}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onConfirmDelete}
            className="flex-1 bg-red-600 hover:bg-red-700"
            disabled={isDeletingGuestUser}
          >
            {isDeletingGuestUser ? 'Deleting...' : 'Delete Traveler'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteTravelerModal
