class ChangeUuidToBeStringInClassGroups < ActiveRecord::Migration[6.1]
  def change
    change_column :class_groups, :uuid, :string
  end
end
