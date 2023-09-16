class ChangeYearsStudiedToYearsStudiedInClassInStudents < ActiveRecord::Migration[6.1]
  def change
    rename_column :students, :years_studied, :home_learning
  end
end
