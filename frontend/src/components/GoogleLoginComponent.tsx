import React from "react";
import { GoogleLogin } from "@react-oauth/google";

interface IGoogleLoginProps {
  onSuccess: (googleUser: any) => void;
  onFailure: (error: any) => void;
}

const GoogleLoginComponent: React.FC<IGoogleLoginProps> = ({ onSuccess }) => {
  return <GoogleLogin onSuccess={onSuccess} />;
};

export default GoogleLoginComponent;
