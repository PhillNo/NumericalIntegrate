function EulerSolve(FHandle, Tstart, deltaT, steps, InitialValues, params)
{
  "use strict";
  
  var States = new Array();
  
  States[0] = Array.from(InitialValues);
  
  for (var i = 1; i < steps; i++)
  {
    var Next = Array.from(FHandle(Tstart + deltaT * steps, States[i - 1], params));
    for (var j in Next)
    {
      Next[j] = Next[j] * deltaT + States[i - 1][j];
    }  
    States[i] =  Array.from(Next);
  }//for each timestep
  
  return States;
  
}//EulerSolve

function RK4(FHandle, Tstart, deltaT, steps, InitialValues, params)
{
  "use strict";
  
  var States = new Array();
  
  var k1, k2, k3, k4, ktemp;
  
  States[0] = Array.from(InitialValues);
  ktemp = Array.from(InitialValues);//just initializing ktemp to 6-element array
  
  for (var i = 1; i < steps; i++)
  {
    k1 = Array.from(FHandle(Tstart + deltaT * steps, States[i - 1], params));
    
    for (var j = 0; j < k1.length; j++)
    {
      ktemp[j] = States[i - 1][j] + (deltaT * k1[j] * 0.5);
    }
    k2 = Array.from(FHandle(Tstart + ((deltaT + 0.5) * steps), ktemp, params));
    
    for (var j = 0; j < k1.length; j++)
    {
      ktemp[j] = States[i - 1][j] + (deltaT * k2[j] * 0.5);
    }
    k3 = Array.from(FHandle(Tstart + (deltaT + 0.5) * steps, ktemp, params));
    
    ktemp = Array.from(k3);
    for (var j = 0; j < k1.length; j++)
    {
      ktemp[j] = States[i - 1][j] + (deltaT * k1[j]);
    }
    k4 = Array.from(FHandle(Tstart + (deltaT + 1) * steps, ktemp, params));
    
    for (var j = 0; j < ktemp.length; j++)
    {
      ktemp[j] = States[i - 1][j] + (deltaT / 6) * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j]);
    }
    
    States[i] = Array.from(ktemp);
  }//for each time step
  
  return States; 
}//RK4

/*Adaptive RK4*/