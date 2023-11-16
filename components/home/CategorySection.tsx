import React from "react";

const categories = [
  {
    name: "Music",
  },
  {
    name: "Theater and Performing Arts",
  },
  {
    name: "Food and Drink",
  },
  {
    name: "Sports and Fitness",
  },
  {
    name: "Business and Professional",
  },
  {
    name: "Health and Wellness",
  },
  {
    name: "Nightlife",
  },
  {
    name: "Family and Kids' Events",
  },
];

const CategorySection = () => {
  return (
    <div className="w-full bg-orange-50 px-5 py-5">
      <ul className="grid gap-3 grid-cols-8 max-w-[1400px] mx-auto">
        {categories.map((category) => (
          <li key={category.name} className="p-4 cursor-pointer">
            <div className="w-full pt-[100%] relative rounded-full border border-gray-300 flex justify-center items-center">
              <svg
                className="absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2"
                width="32"
                height="33"
                fill="none"
                viewBox="0 0 32 33"
              >
                <g id="buisness-profession_svg__icon_selection">
                  <path
                    id="buisness-profession_svg__primary_fill"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.002 5.936L15 6.01v.493h2V6.01l-.002-.073a1 1 0 00-1.996 0zM18 6.502h9.5a.5.5 0 010 1H27v16h.5a.5.5 0 110 1h-3.172l.046.046.006.005.006.007.067.072.011.012a2 2 0 01-2.833 2.813l-.01-.01-.065-.06-.006-.007-.004-.003-2.875-2.875H13.41l-2.873 2.874-.01.01-.065.061-.01.01a2 2 0 01-2.834-2.813l.011-.012.068-.072.011-.012.046-.046H4.5a.5.5 0 010-1H5v-16h-.5a.5.5 0 010-1H14v-.514l.003-.089v-.014a2 2 0 013.994 0v.014l.003.089v.514zm-12 1v16h20v-16H6zm16.914 17h-2.828l2.162 2.162.053.05a1 1 0 001.416-1.405l-.055-.06-.748-.747zm-10.919 0H9.167l-.747.747-.056.06a1 1 0 001.416 1.405l.054-.05 2.161-2.162zM8.145 9.65a.5.5 0 01.355-.147h6a.5.5 0 01.5.496l.04 5.5a.5.5 0 11-1 .008l-.036-5.004H9.002l.036 10h5.002v-2a.5.5 0 111 0v2.5a.5.5 0 01-.5.5h-6a.5.5 0 01-.5-.498l-.04-11a.5.5 0 01.146-.355zM17 18.002a.5.5 0 100 1h6.5a.5.5 0 000-1H17zm-.5-2.5a.5.5 0 01.5-.5h5.5a.5.5 0 110 1H17a.5.5 0 01-.5-.5zm.5-3.5a.5.5 0 100 1h6.5a.5.5 0 000-1H17z"
                    fill="#3A3247"
                  ></path>
                </g>
              </svg>
            </div>
            <p className="mt-2 text-center font-medium">{category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySection;
