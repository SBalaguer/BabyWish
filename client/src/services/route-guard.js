export const routeGuard = async role => {
  try {
    if (this.state.userState) {
      if ((this.state.userState.role = role)) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    throw error;
  }
};
