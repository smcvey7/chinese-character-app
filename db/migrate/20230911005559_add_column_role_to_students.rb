class AddColumnRoleToStudents < ActiveRecord::Migration[6.1]
  def change
    add_column :students, :role, :string, default: "student"
  end
end
