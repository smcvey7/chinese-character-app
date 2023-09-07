class AddDefaultToAdminInTeachers < ActiveRecord::Migration[6.1]
  def change
    change_column_default :teachers, :admin, false
  end
end
