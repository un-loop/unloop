class BulkAssignmentSerializer < ActiveModel::Serializer
  attributes :id, :due_date, :participant, :updated_at, :completed_participant, :completed_staff

  belongs_to :participant, serializer: SimpleParticipantSerializer
end
