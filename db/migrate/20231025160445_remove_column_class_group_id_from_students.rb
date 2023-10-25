class RemoveColumnClassGroupIdFromStudents < ActiveRecord::Migration[6.1]
  def change
    remove_column :students, :class_group_id, :integer
  end
end
