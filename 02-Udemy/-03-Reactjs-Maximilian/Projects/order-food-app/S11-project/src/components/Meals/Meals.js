import { Fragment } from "react";
import MealsSummary from "./MealsSummary";
import AvaliableMeals from "./AvaliableMeals";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvaliableMeals />
    </Fragment>
  );
};

export default Meals;
