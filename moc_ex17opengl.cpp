/****************************************************************************
** Meta object code from reading C++ file 'ex17opengl.h'
**
** Created by: The Qt Meta Object Compiler version 63 (Qt 4.8.6)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "ex17opengl.h"
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'ex17opengl.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 63
#error "This file was generated using the moc from 4.8.6. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
static const uint qt_meta_data_Ex17opengl[] = {

 // content:
       6,       // revision
       0,       // classname
       0,    0, // classinfo
       9,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       2,       // signalCount

 // signals: signature, parameters, type, tag, flags
      17,   12,   11,   11, 0x05,
      33,   11,   11,   11, 0x05,

 // slots: signature, parameters, type, tag, flags
      48,   44,   11,   11, 0x0a,
      66,   63,   11,   11, 0x0a,
      91,   86,   11,   11, 0x0a,
     110,  106,   11,   11, 0x0a,
     124,  122,   11,   11, 0x0a,
     137,   63,   11,   11, 0x0a,
     156,   11,   11,   11, 0x0a,

       0        // eod
};

static const char qt_meta_stringdata_Ex17opengl[] = {
    "Ex17opengl\0\0text\0angles(QString)\0"
    "light(int)\0sel\0setShader(int)\0on\0"
    "setPerspective(int)\0type\0setObject(int)\0"
    "ang\0setPos(int)\0z\0setElev(int)\0"
    "setLightMove(bool)\0reset()\0"
};

void Ex17opengl::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        Q_ASSERT(staticMetaObject.cast(_o));
        Ex17opengl *_t = static_cast<Ex17opengl *>(_o);
        switch (_id) {
        case 0: _t->angles((*reinterpret_cast< QString(*)>(_a[1]))); break;
        case 1: _t->light((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 2: _t->setShader((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 3: _t->setPerspective((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 4: _t->setObject((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 5: _t->setPos((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 6: _t->setElev((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 7: _t->setLightMove((*reinterpret_cast< bool(*)>(_a[1]))); break;
        case 8: _t->reset(); break;
        default: ;
        }
    }
}

const QMetaObjectExtraData Ex17opengl::staticMetaObjectExtraData = {
    0,  qt_static_metacall 
};

const QMetaObject Ex17opengl::staticMetaObject = {
    { &QGLWidget::staticMetaObject, qt_meta_stringdata_Ex17opengl,
      qt_meta_data_Ex17opengl, &staticMetaObjectExtraData }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &Ex17opengl::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *Ex17opengl::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *Ex17opengl::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_Ex17opengl))
        return static_cast<void*>(const_cast< Ex17opengl*>(this));
    return QGLWidget::qt_metacast(_clname);
}

int Ex17opengl::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QGLWidget::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        if (_id < 9)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 9;
    }
    return _id;
}

// SIGNAL 0
void Ex17opengl::angles(QString _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}

// SIGNAL 1
void Ex17opengl::light(int _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 1, _a);
}
QT_END_MOC_NAMESPACE
