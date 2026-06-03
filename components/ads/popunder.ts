export const triggerAdsterraPopunder = () => {
    const smartlinkUrl = 'https://smelthrsfranz.com/f34g503gz?key=5e0d9a1656c347c1253a847415ec19a7';
    // User interaction required for this not to be blocked by basic popup blockers.
    // It should be called inside an onClick handler.
    try {
        window.open(smartlinkUrl, '_blank', 'noopener,noreferrer');
    } catch (e) {
        console.error("Popup blocked", e);
    }
};
