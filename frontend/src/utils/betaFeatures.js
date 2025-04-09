// Beta features configuration
const BETA_FEATURES_KEY = 'beta-features';

// Initialize beta features for new users
export const initializeBetaFeatures = () => {
  // Only set for new users who don't have the key yet
  if (!localStorage.getItem(BETA_FEATURES_KEY)) {
    localStorage.setItem(
      BETA_FEATURES_KEY,
      JSON.stringify({
        hideTodayTab: true,
      })
    );
  }
};

// Check if a specific beta feature is enabled
export const isBetaFeatureEnabled = (featureName) => {
  const features = JSON.parse(
    localStorage.getItem(BETA_FEATURES_KEY) || '{}'
  );
  return features[featureName] || false;
};

// Toggle a beta feature on/off (for settings page)
export const toggleBetaFeature = (featureName, value) => {
  const features = JSON.parse(
    localStorage.getItem(BETA_FEATURES_KEY) || '{}'
  );
  features[featureName] = value;
  localStorage.setItem(BETA_FEATURES_KEY, JSON.stringify(features));
};
