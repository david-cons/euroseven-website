import { Paper, Typography } from "@mui/material";

export const NavCard: React.FC<{
  text: string;
  boxColor: string;
  path1: string;
  circle?: { cx: string; cy: string; r: string };
  path2?: string;
  polyline?: string;
  polygon?: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}> = ({
  text,
  boxColor,
  path1,
  circle,
  path2,
  polyline,
  polygon,
  href,
  onClick,
}) => {
  return (
    <div onClick={onClick}>
      <Paper
        elevation={5}
        className="card-single"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          background: "white",
          padding: "2rem",
          boxShadow: "0 8px 16px -8px rgba(0, 0, 0, 0.3)",
          position: "relative",
          height: "175px",
          width: "425px",
          flexDirection: "column",
          transition: "background-color 0.5s, color 0.5s", // Smooth transition for backgroundColor, transform, and color
          "&:hover": {
            backgroundColor: boxColor,
            color: "white", // Change text color to white on hover
            "& .your-svg-path": {
              stroke: "white", // Change SVG stroke color to white on hover
              transition: "stroke 0.5s",
            },
            "& svg": {
              width: "85px", // Increase SVG width on hover
              height: "85px", // Increase SVG height on hover
              transition: "width 0.5s, height 0.5s", // Smoothly transition width and height
            },
          },
          "&:not(:hover)": {
            backgroundColor: "white",
            color: "black", // Change text color to white on hover
            "& .your-svg-path": {
              stroke: boxColor, // Change SVG stroke color to white on hover
              transition: "stroke 0.5s",
              animation: "draw 20s linear forwards !important",
            },
            // Transition back to original size when not hovering
            "& svg": {
              width: "75px", // Original SVG width
              height: "75px", // Original SVG height
              transition: "width 0.5s, height 0.5s",
            },
          },
        }}
      >
        <div className="svg-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="75"
            height="75"
            viewBox="0 0 24 24"
            fill="none"
            stroke={boxColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path className="your-svg-path" d={path1} />
            {circle && (
              <circle
                className="your-svg-path"
                cx={circle.cx}
                cy={circle.cy}
                r={circle.r}
              ></circle>
            )}
            {polyline && (
              <polyline className="your-svg-path" points={polyline}></polyline>
            )}
            {polygon && (
              <polygon className="your-svg-path" points={polygon}></polygon>
            )}
            {path2 && <path className="your-svg-path" d={path2} />}
          </svg>
        </div>
        <Typography
          variant="h6"
          component="div"
          sx={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            p: "20px",
            fontFamily: "Catesque",
          }}
        >
          {text}
        </Typography>
      </Paper>
    </div>
  );
};
