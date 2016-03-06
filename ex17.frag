/*
 * 2D, 3D and 4D Perlin noise, classic and simplex, in a GLSL fragment shader.
 *
 * Classic noise is implemented by the functions:
 * float noise(vec2 P)
 * float noise(vec3 P)
 * float noise(vec4 P)
 *
 * Simplex noise is implemented by the functions:
 * float snoise(vec2 P)
 * float snoise(vec3 P)
 * float snoise(vec4 P)
 *
 * Author: Stefan Gustavson ITN-LiTH (stegu@itn.liu.se) 2004-12-05
 * You may use, modify and redistribute this code free of charge,
 * provided that my name and this notice appears intact.
 */

uniform int       mode;
uniform float     time;
uniform sampler2D PermTex;
uniform sampler1D SimpTex;
uniform sampler2D GradTex;

//  Light from vertex shader
varying float LightIntensity;


//  Offsets of one texel and one half texel in 256x256 texture
#define ONE 0.00390625
#define ONEHALF 0.001953125

// The skewing and unskewing factors are much simpler for the 3D case
#define F3 0.333333333333
#define G3 0.166666666667

// The skewing and unskewing factors are hairy again for the 4D case
// This is (sqrt(5.0)-1.0)/4.0
#define F4 0.309016994375
// This is (5.0-sqrt(5.0))/20.0
#define G4 0.138196601125

// The interpolation function. This could be a 1D texture lookup
// to get some more speed, but it's not the main part of the algorithm.
// Improved fade, yields C2-continuous noise
float fade(float t)
{
   return t*t*t*(t*(t*6.0-15.0)+10.0);
}


/*
 * 2D classic Perlin noise. Fast, but less useful than 3D noise.
 */
float noise(vec2 P)
{
   vec2 Pi = ONE*floor(P)+ONEHALF; // Integer part, scaled and offset for texture lookup
   vec2 Pf = fract(P);             // Fractional part for interpolation

   // Noise contribution from the four corners
   float n00 = dot(4.0*texture2D(PermTex,Pi              ).rg-1.0 , Pf);
   float n10 = dot(4.0*texture2D(PermTex,Pi+vec2(ONE,0.0)).rg-1.0 , Pf-vec2(1,0));
   float n01 = dot(4.0*texture2D(PermTex,Pi+vec2(0.0,ONE)).rg-1.0 , Pf-vec2(0,1));
   float n11 = dot(4.0*texture2D(PermTex,Pi+vec2(ONE,ONE)).rg-1.0 , Pf-vec2(1,1));

   // Blend contributions along x
   vec2 n_x = mix(vec2(n00,n01) , vec2(n10,n11) , fade(Pf.x));

   // Blend contributions along y
   return mix(n_x.x,n_x.y,fade(Pf.y));
}


/*
 * 2D simplex noise. Somewhat slower but much better looking than classic noise.
 */
float snoise(vec2 P)
{

// Skew and unskew factors are a bit hairy for 2D, so define them as constants
// This is (sqrt(3.0)-1.0)/2.0
#define F2 0.366025403784
// This is (3.0-sqrt(3.0))/6.0
#define G2 0.211324865405

   // Skew the (x,y) space to determine which cell of 2 simplices we're in
   float s = (P.x + P.y) * F2;   // Hairy factor for 2D skewing
   vec2 Pi = floor(P + s);
   float t = (Pi.x + Pi.y) * G2; // Hairy factor for unskewing
   vec2 P0 = Pi - t; // Unskew the cell origin back to (x,y) space
   Pi = Pi * ONE + ONEHALF; // Integer part, scaled and offset for texture lookup

   vec2 Pf0 = P - P0;  // The x,y distances from the cell origin

   // For the 2D case, the simplex shape is an equilateral triangle.
   // Find out whether we are above or below the x=y diagonal to
   // determine which of the two triangles we're in.
   vec2 o1 = (Pf0.x > Pf0.y) ? vec2(1,0) : vec2(0,1);

   // Noise contribution from simplex origin
   vec2 grad0 = 4.0*texture2D(PermTex, Pi).rg - 1.0;
   float t0 = 0.5 - dot(Pf0, Pf0);
   float n0;
   if (t0 < 0.0)
      n0 = 0.0;
   else
   {
      t0 *= t0;
      n0 = t0*t0*dot(grad0,Pf0);
   }

   // Noise contribution from middle corner
   vec2 Pf1 = Pf0 - o1 + G2;
   vec2 grad1 = 4.0*texture2D(PermTex,Pi+o1*ONE).rg - 1.0;
   float t1 = 0.5 - dot(Pf1,Pf1);
   float n1;
   if (t1 < 0.0)
      n1 = 0.0;
   else
   {
      t1 *= t1;
      n1 = t1 * t1 * dot(grad1, Pf1);
   }

   // Noise contribution from last corner
   vec2 Pf2 = Pf0 - vec2(1.0-2.0*G2);
   vec2 grad2 = 4.0*texture2D(PermTex, Pi + vec2(ONE,ONE)).rg - 1.0;
   float t2 = 0.5 - dot(Pf2,Pf2);
   float n2;
   if (t2 < 0.0)
      n2 = 0.0;
   else
   {
      t2 *= t2;
      n2 = t2*t2*dot(grad2,Pf2);
   }

   // Sum up and scale the result to cover the range [-1,1]
   return 70.0 * (n0 + n1 + n2);
}





float flow(vec2 p)
{	
	mat2 m2 = mat2( 0.80,  0.60, -0.60,  0.80 );
	float z=2.;
	float rz = 0.;
	
	float noiseVar;
	noiseVar = (mode == 1)? noise(p):snoise(p); 
	for (float i= 1.;i < 7.;i++ )
	{
		rz+= abs((noiseVar-0.5)*2.)/z;
		z = z*3.;
		p = p*5.;
		p*= m2;
	}
	return rz;
}


void main(void)
{
   vec2 T2 = 8.0*gl_TexCoord[0].xy;

   float n;
   //  2D classic noise + time animation
   n = flow(T2*.5+time);
   n *= dot(T2*2.,T2*.5);
     
   // Color based on noise
   vec3 col = vec3(.9,1.5,0.8)/(.9-n);
   
    // Apply lighting
   col *= LightIntensity*LightIntensity*2.;
   gl_FragColor = vec4(sqrt(abs(col)),1.0);
}
