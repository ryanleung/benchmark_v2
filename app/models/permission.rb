class Permission < ApplicationRecord
  belongs_to :metric_unit
  belongs_to :user
end
