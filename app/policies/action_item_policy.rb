class ActionItemPolicy < ApplicationPolicy
    def create?
      staff?
    end
  
    def update?
      staff?
    end
  
    def destroy?
        staff?
    end

    def show?
      staff?
    end

    def bulk_modify_select?
      staff?
    end

    def bulk_modify_create?
      staff?
    end

    private

    def staff?
      user.present? && user.staff?
    end
  end