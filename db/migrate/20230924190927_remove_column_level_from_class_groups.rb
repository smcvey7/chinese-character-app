class RemoveColumnLevelFromClassGroups < ActiveRecord::Migration[6.1]
  def change
    remove_column :class_groups, :level
  end
end
