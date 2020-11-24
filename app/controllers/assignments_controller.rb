class AssignmentsController < ApplicationController
    def index
        @assignments = authorize Assignment.all
        @user = current_user
        @participants = Participant.all
        @participants_list = []

        @participants.each do |p|
          if p.personal_questionnaire.nil?
              PersonalQuestionnaire.create("participant_id": p.id)
          end

          participant = SimpleParticipantSerializer.new(p)
          @participants_list.push(participant)
        end

        @templates = ActionItem.where(is_template: true).order('created_at DESC')
        @templates_list = []
        @templates.each do |template|
            serialized_action_item = ActionItemSerializer.new(template)
            @templates_list.push(serialized_action_item)
        end
    end

    def bulk_modify_select
      @action_items = authorize ActionItem.select("title, updated_at, category, id").order("updated_at DESC").all
    end

    def bulk_modify_create
      @action_item_id = params.fetch(:action_item_id)
      @assignments = authorize Assignment.where(action_item_id: @action_item_id).order("updated_at DESC").includes(:participant)
      @assignments_list = []
      @assignments.each do |assignment|
        serialized_assignment = BulkAssignmentSerializer.new(assignment)
        @assignments_list.push(serialized_assignment)
      end
      @action_item = ActionItem.find(@action_item_id)
    end

end
