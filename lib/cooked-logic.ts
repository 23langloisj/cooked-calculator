export const getCookedLabel = (score: number) => {
    if (score < 20) return "Locked In";
    if (score < 40) return "Stable-ish";
    if (score < 60) return "Mildly Cooked";
    if (score < 80) return "Deep Fried";
    return "Absolute Chud";
  };
  
  export const getScoreColor = (score: number) => {
    if (score < 30) return "text-green-500";
    if (score < 60) return "text-yellow-500";
    return "text-orange-600";
  };