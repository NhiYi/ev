export const PriceService = {
  calculate(distanceKm, minutes) {
    const base = 10000;
    const perKm = 3000;
    const perMin = 200;

    return base + distanceKm * perKm + minutes * perMin;
  }
};
