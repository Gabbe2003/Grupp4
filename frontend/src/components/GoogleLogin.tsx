// GoogleLoginComponent.tsx

import React from "react";
import { GoogleLogin } from "@react-oauth/google";

interface IGoogleLoginProps {
  onSuccess: (response: any) => void;
}

const GoogleLoginComponent: React.FC<IGoogleLoginProps> = ({ onSuccess }) => {
  return <GoogleLogin onSuccess={onSuccess} />;
};

export default GoogleLoginComponent;
