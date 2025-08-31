# TODO: Fix Skill Tooltip and Modal Behavior on Mobile

## Completed Steps
- [x] Analyze the issue: Clicking skills shows both tooltip and work experience modal on mobile
- [x] Plan the fix: Improve mobile detection and remove modal trigger on skill click
- [x] Edit `assets/js/main.js` to implement updated behavior
  - Changed mobile detection to `window.matchMedia("(max-width: 600px)").matches`
  - Removed click event that shows experience modal on skills
  - For desktop: hover shows tooltip
  - For mobile: tap shows tooltip (with 3s timeout), no modal
  - Experience modal is now only accessible via the "Experience" link in About section

## Pending Steps
- [ ] Test on desktop: Verify hover shows tooltip
- [ ] Test on mobile: Verify tap shows only tooltip, no modal
- [ ] If needed, adjust mobile breakpoint (currently 600px) or tooltip positioning
