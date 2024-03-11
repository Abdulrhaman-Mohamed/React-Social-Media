export const CustomTheme = {
  list: {
    styles: {
      base: {
        list: {
          fontWeight: "font-normal",
          color: " text-secondary/50",
        },
        item: {
            initial: {
              bg: "hover:bg-secondary/10 hover:bg-opacity-80 focus:bg-secondary/10 focus:bg-opacity-80 active:bg-secondary/10 active:bg-opacity-80",
              color: "hover:text-secondary focus:text-secondary active:text-secondary",
              outline: "outline-none",
            },
            selected: {
              bg: "bg-blue-gray-50/50",
              color: "text-blue-gray-700",
            },
        }
      },
    },
  },
}
