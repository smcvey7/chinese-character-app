class RenameColumnClassIdToClassGroupIdInStudents < ActiveRecord::Migration[6.1]
  def change
    rename_column :students, :class_id, :class_group_id
  end
end
