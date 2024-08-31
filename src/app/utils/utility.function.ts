export class UtilityFunctions {
    async calculateExpiration(expiresIn: string): Promise<Date> {
        const now = new Date();
        const timeUnits: { [key: string]: number } = {
          s: 1, // seconds
          m: 60, // minutes
          h: 3600, // hours
          d: 86400, // days
        };
    
        const match = expiresIn.match(/^(\d+)([smhd])$/);
        if (!match) {
          throw new Error("Invalid expiresIn format");
        }
    
        const [, value, unit] = match;
        const unitKey = unit as keyof typeof timeUnits; // Type assertion to ensure unit is a valid key
        const seconds = parseInt(value, 10) * timeUnits[unitKey];
    
        now.setSeconds(now.getSeconds() + seconds);
        return now;
      }
}

export const utilityFunctions = new UtilityFunctions();
