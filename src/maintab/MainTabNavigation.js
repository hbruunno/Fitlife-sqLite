import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListarAluno from '../listaraluno/ListarAluno';
import CadastrarAluno from '../cadastroaluno/CadastrarAluno';
import HomeScreen from '../inicio/Inicio';
import Pagamento from '../pagamento/Pagamento';
import {Feather} from '@expo/vector-icons'
const Tab = createBottomTabNavigator();

export default function MainTabNavigation() {
  return (
    
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{  tabBarLabel: 'Início', 
        tabBarIcon: ({color, size}) => <Feather name= "home" color={color} size={size}/>  }
      }
      
      />
        <Tab.Screen
          name="Lista"
          component={ListarAluno}
          options={{tabBarIcon: ({color, size}) => <Feather name= "list" color={color} size={size}/>
        }}
        />
        <Tab.Screen
          name="Cadastro"
          component={CadastrarAluno}
          options={{tabBarIcon: ({color, size}) => <Feather name= "file-plus" color={color} size={size}/>
        }}
        />
        <Tab.Screen
          name="Pagamento"
          component={Pagamento}
          options={{tabBarIcon: ({color, size}) => <Feather name= "check-square" color={color} size={size}/>
        }}
               
        />

 
      </Tab.Navigator>
    
  );
}
