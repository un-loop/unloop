class ProfessionalQuestionnaire < ApplicationRecord
    belongs_to :participant
    has_one_attached :resume
    
end
