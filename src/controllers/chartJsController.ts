import { ChartJsViewModel } from "../presenters/chartJsPresenter"

export function chartJsController(): ChartJsViewModel {
  return {
    data: [12, 19, 3, 5, 2, 3],
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  }
}
