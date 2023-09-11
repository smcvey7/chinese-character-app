class AddColumnRoleToTeachers < ActiveRecord::Migration[6.1]
  def change
    add_column :teachers, :role, :string, default: "teacher"
  end
end
