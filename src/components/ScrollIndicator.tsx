"use client";

/**
 * ScrollIndicator Component
 * 
 * Displays the "EXPLORE" text and the floating arrow to indicate
 * to the user that more content is available by scrolling down.
 * Implements smooth CSS animations.
 */
export default function ScrollIndicator() {
  return (
    <div className="scroll-div">
      <div className="explore-div">
        <h3 className="explore-text-h3">EXPLORE</h3>
      </div>
      <div className="scroll-svg-div">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 32 32" fill="none" aria-hidden="false">
          <path stroke="currentColor" strokeWidth="2" d="M28 10 L16 22 L4 10"></path>
        </svg>
      </div>
    </div>
  );
}
