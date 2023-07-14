import React from 'react'
import { useUser } from '../../../hooks/useUser'
import BarraSuperior from '../../BarraSuperior'
import Menu from '../../Menu'
import styles from './Layout.module.css'

export function Layout({children}) {
    const { user } = useUser()
    if (!user) return <>{children}</>
    return(
    <div className={styles.container}>
        <div className={styles.izquierda}>
            <div>
                <BarraSuperior/>
                <button onClick={() => null}>
                Mostrar/Ocultar Jardin
                </button>
                <button onClick={() => null}>
                Mostrar/Ocultar Logros
                </button>
                <button onClick={() => null}>
                Mostrar/Ocultar Publicaciones
                </button>
            </div>
        </div>
        <div className={styles.Menu}>
            <Menu
                foto='incognito'
            />
            <div className={styles.content}>
                {children}
            </div>
        </div>
    </div>  
  )
}
